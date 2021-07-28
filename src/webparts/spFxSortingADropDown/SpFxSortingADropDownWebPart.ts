import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpFxSortingADropDownWebPartStrings';
import SpFxSortingADropDown from './components/SpFxSortingADropDown';
import { ISpFxSortingADropDownProps } from './components/ISpFxSortingADropDownProps';

export interface ISpFxSortingADropDownWebPartProps {
  description: string;
}

export default class SpFxSortingADropDownWebPart extends BaseClientSideWebPart<ISpFxSortingADropDownWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpFxSortingADropDownProps> = React.createElement(
      SpFxSortingADropDown,
      {
        description: this.properties.description,
        webURL:this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
