 import React, {Component} from 'react';
 import { 
    EditorState,
    SelectionState,
    Modifier,
} from 'draft-js';
import Layout from './layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { InputLabel } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import Typo from "typo-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../index.css';
import {affData, dictionaryData} from "../utils/dictionaryData"
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
// import DeleteIcon from '@material-ui/icons/Delete';

export default class RichTextExample extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            chapters:["chp1","chp2"],
            chapterName:'',
            lastOffset:0
        };
        this.handleBeforeInput = this.handleBeforeInput.bind(this);
    }
    onEditorStateChange = (editorState) => {
        this.setState({ editorState });
    }
   
    // componentDidMount() {
    //     const {editorState} = this.state;
    //     const currentContent = editorState.getCurrentContent(),
    //     currentSelection = editorState.getSelection();
    //     const newContent = Modifier.replaceText(
    //         currentContent,
    //         currentSelection,
    //         'A'
    //         );
    //         const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
    //         this.setState({
    //             editorState: newEditorState
    //         });
    //     }
        
        handleBeforeInput(chars, editorState){
            if(chars == ' '){
                const selectionState = editorState.getSelection();
                const anchorKey = selectionState.getAnchorKey();
                const contentState = editorState.getCurrentContent();
                const currentContentBlock = contentState.getBlockForKey(anchorKey);
                const blockText = currentContentBlock.getText();
                const result = blockText.slice(this.state.lastOffset, selectionState.getEndOffset());
                var dictionary = new Typo("en_US",affData, dictionaryData);
                var is_spelled_correctly = dictionary.check(result);
                if (!is_spelled_correctly) {
                    var array_of_suggestions = dictionary.suggest(result);
                    if(array_of_suggestions.length > 0){
                        let replaceText = array_of_suggestions[0]+' ';
                        const blockKey = currentContentBlock.getKey();
                        let replaced = Modifier.replaceText(
                            contentState,
                            SelectionState.createEmpty(blockKey)
                            .merge({
                                anchorKey: blockKey,
                                anchorOffset: this.state.lastOffset,
                                focusKey: blockKey,
                                focusOffset: selectionState.getEndOffset(),
                            }),
                            replaceText
                        );
                        let newOffset = selectionState.getEndOffset() + (replaceText.length - result.length);
                        const currentSelection = this.state.editorState.getSelection()
                        editorState = EditorState.push(
                            editorState,
                            replaced
                        )
                        editorState = EditorState.forceSelection(editorState,currentSelection);

                        this.setState({editorState
                                ,
                                    lastOffset: newOffset});
                        return true;
                    }
            }
                            this.setState({editorState, lastOffset: selectionState.getEndOffset()});
            }
        }
    
        // newchapter(){
        //     return(
        //         <div>
        //     <form onSubmit = {this.newSubmit}>
        //    <FormControl required halfWidth margin='normal'>
        //     <InputLabel id='chapter-name'>Enter Your Chapter Title</InputLabel>
        //     <Input autoComplete='chapter' autofocus id='chapter-name' 
        //     onChange={this.addchap}
        //     >
        //     </Input>
        //    </FormControl>               
        //    </form>
        //    </div>
        //     )
        // }          
    render() {
        return (
            <div>
                <Layout chapters={this.state.chapters}/>
            <div className="sidebar">
            <Button
            variant="contained"
            color="secondary"
            onClick={()=>this.newchapter}
            >          
             <FontAwesomeIcon  icon={faPlus } />
            ADD A CHAPTER
          </Button>         
          <form onSubmit = {this.newSubmit}>
           <FormControl required halfWidth margin='normal'>
            <InputLabel id='chapter-name'>Enter Your Chapter Title</InputLabel>
            <Input autoComplete='chapter' autofocus id='chapter-name' 
            onChange={this.addchap}
            >
            </Input>
           </FormControl>               
           </form>           
            </div>
            <Editor
                editorState={this.state.editorState}
                onEditorStateChange={this.onEditorStateChange}
                handleBeforeInput={this.handleBeforeInput}
                spellCheck={false}
                autocorrect="off"
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                toolbarOnFocus={true}
           />
           </div>

        );
    }
    newSubmit=(e)=>{
        e.preventDefault();
    }
    addchap=(e)=>{
        // e.keyCode === 13 ? this.updatechapter() : 
        this.setState({
            chapterName:e.target.value
        });       
        this.updatechapter()
      }
      updatechapter=()=>{
        console.log(this.state.chapterName)
        this.setState({
            chapters:[...this.state.chapters,this.state.chapterName],
            // chapterName:''
        })
        
    }
      
}
