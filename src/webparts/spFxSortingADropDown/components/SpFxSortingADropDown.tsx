import * as React from 'react';
import styles from './SpFxSortingADropDown.module.scss';
import { ISpFxSortingADropDownProps } from './ISpFxSortingADropDownProps';
import { escape } from '@microsoft/sp-lodash-subset';

//import pnp
import "@pnp/sp";
import "@pnp/sp/webs";
import { Item, Web } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { ICamlQuery } from "@pnp/sp/lists";
import { ITheme, mergeStyleSets, getTheme, getFocusStyle, List, ImageFit, Image } from '@fluentui/react';

const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;

const classNames = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight },
      },
    },
  ],
  itemImage: {
    flexShrink: 0,
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1,
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  ],
  itemIndex: {
    marginBottom: 10,
  }

});


export interface IBasicListStates {
  Items: any; 
  terms: any;
  title: '';  

}

export default class SpFxSortingADropDown extends React.Component<ISpFxSortingADropDownProps, IBasicListStates> {
  constructor(props: ISpFxSortingADropDownProps, state: IBasicListStates) {
    super(props);
    this.state =( {
      Items: [],
      terms: [],
      title:'', 
    });
  }


public componentDidMount(){
 
this.fetchData();
}
public async fetchData() {

  let web = Web(this.props.webURL);
  const items: any[] = await web.lists.getByTitle("site pages").items.getAll();
  console.log(items);
  this.setState({ Items: items });
}
  public render(): React.ReactElement<ISpFxSortingADropDownProps> {   
    
    return (
         <div data-is-scrollable>
        <h1>News</h1>
        <List items={this.state.Items} onRenderCell={this.onRenderCell} />      
      </div>      
    );
  }
  
  public onRenderCell = (item): JSX.Element => {    
    var fileName = '';
    var imageFile = window.location.origin + item.image;
    if(imageFile === null)
    {
      return ;
    }
    const imageJson = JSON.parse(item.image);
    var newimage = imageJson.serverRelativeUrl;
    console.log(newimage);
 
    return (
            <div className={classNames.itemCell} data-is-focusable={true}>
     
    
        <Image className={classNames.itemImage} src={newimage} width={100} height={120} imageFit={ImageFit.cover} />
        <div className={classNames.itemContent}>
          <div className={classNames.itemName}>{item.Title}</div>        
          <div className={classNames.itemIndex}>The Hub | News Article | {item.Source}<strong></strong>{FormatDate(item.Created)}</div>
          <div>{item.Urgent}</div>
    
        </div>        
      </div>    
    );
  }
}

export const FormatDate = (date): string => {
  // console.log(date);
  var date1 = new Date(date);
  var year = date1.getFullYear();
  var month = (1 + date1.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date1.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return month + '/' + day + '/' + year;
};

