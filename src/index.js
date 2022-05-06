import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import { SampleBase } from './sample-base';
import {
    DocumentEditorContainerComponent,
    Toolbar
} from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VVhhQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkFhUX1cdXVRTmBeUUc=');

let data = {
    "sections": [{
        "blocks": [{
            "paragraphFormat": {
                "styleName": "Normal"
            },
            "inlines": [{
                "text": "TEST TEST",
                "characterFormat": {
                    "fontSize": 18.0,
                    "fontFamily": "Monotype Corsiva"
                }
            }]
        },

        ],
        "headersFooters": {},
        "sectionFormat": {
            "headerDistance": 36.0,
            "footerDistance": 36.0,
            "pageWidth": 612.0,
            "pageHeight": 792.0,
            "leftMargin": 72.0,
            "rightMargin": 72.0,
            "topMargin": 72.0,
            "bottomMargin": 72.0,
            "differentFirstPage": false,
            "differentOddAndEvenPages": false
        }
    }],
    "characterFormat": {
        "fontFamily": "Times New Roman"
    },
    "background": {
        "color": "#FFFFFFFF"
    },
    "styles": [{
        "type": "Paragraph",
        "name": "Normal",
        "next": "Normal",
        "characterFormat": {
            "fontSize": 12.0
        }
    }, {
        "type": "Character",
        "name": "Default Paragraph Font"
    }]
};

DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
export class CharacterFormatView extends SampleBase {
    hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';
    container;
    titleBar;
    metadata;

    rendereComplete() {
        this.container.serviceUrl = this.hostUrl + 'api/documenteditor/';
        this.container.documentEditor.pageOutline = '#E0E0E0';
        this.container.documentEditor.acceptTab = true;
        this.container.documentEditor.resize();
        this.titleBar = new TitleBar(
            document.getElementById('documenteditor_titlebar'),
            this.container.documentEditor,
            true
        );
        this.onLoadDefault();
        this.metadata = this.onCreated.bind(this)
    }
    onCreated() {
        // To get the content as SFDT
        let selectedContent = this.container.documentEditor.serialize();
        // console.log(selectedContent)
        return selectedContent
    }

    metadata = this.onCreated.bind(this)
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div
                        id='documenteditor_titlebar'
                        className="e-de-ctn-title"
                    >
                    </div>
                    <div id="documenteditor_container_body">
                        <DocumentEditorContainerComponent
                            id="container"
                            ref={(scope) => { this.container = scope; }}
                            style={{ 'display': 'block' }}
                            width={'90%'}
                            height={'590px'}
                            serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
                            enableToolbar={true}
                            locale='en-US'
                            created={this.onCreated.bind(this)}
                        />
                    </div>
                    <div>
                        {console.log(this.metadata)}
                    </div>
                </div>
                
                <script>
                    {window.onbeforeunload = function () {
                        return 'Want to save your changes?';
                    }}
                </script>
            </div>);
    }
    onLoadDefault = () => {
        // tslint:disable
        data  
        this.container.documentEditor.open(JSON.stringify(data));
        this.container.documentEditor.documentName = 'Character Formatting';
        this.titleBar.updateDocumentTitle();
        this.container.documentChange = () => {
            this.titleBar.updateDocumentTitle();
            this.container.documentEditor.focusIn();
        };
    };
}

render(<CharacterFormatView />, document.getElementById('sample')), console;