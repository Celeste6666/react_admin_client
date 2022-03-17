import React, { Component } from 'react';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default class ProductTextArea extends Component {
  onEditorStateChange = (editorState) => {
    this.props.updateEditorContent(editorState);
  };

  render() {
    const { editorContent } = this.props;
    return (
      <div>
        <Editor
          editorState={editorContent}
          editorStyle={{ border: '2px solid #000', minHeight: '150px', margin: '15px 0', padding: '0 15px'}}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}