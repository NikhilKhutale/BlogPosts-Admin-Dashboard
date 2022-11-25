import React from "react";
import { Quill } from "react-quill";
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';



const CustomUndo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
        <path
            className="ql-stroke"
            d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
        />
    </svg>
);


const CustomRedo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
        <path
            className="ql-stroke"
            d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
        />
    </svg>
);

const CustomImageFromLink = () => (
    <svg class="svg-icon" viewBox="0 0 20 20">
        <path d="M18.555,15.354V4.592c0-0.248-0.202-0.451-0.45-0.451H1.888c-0.248,0-0.451,0.203-0.451,0.451v10.808c0,0.559,0.751,0.451,0.451,0.451h16.217h0.005C18.793,15.851,18.478,14.814,18.555,15.354 M2.8,14.949l4.944-6.464l4.144,5.419c0.003,0.003,0.003,0.003,0.003,0.005l0.797,1.04H2.8z M13.822,14.949l-1.006-1.317l1.689-2.218l2.688,3.535H13.822z M17.654,14.064l-2.791-3.666c-0.181-0.237-0.535-0.237-0.716,0l-1.899,2.493l-4.146-5.42c-0.18-0.237-0.536-0.237-0.716,0l-5.047,6.598V5.042h15.316V14.064z M12.474,6.393c-0.869,0-1.577,0.707-1.577,1.576s0.708,1.576,1.577,1.576s1.577-0.707,1.577-1.576S13.343,6.393,12.474,6.393 M12.474,8.645c-0.371,0-0.676-0.304-0.676-0.676s0.305-0.676,0.676-0.676c0.372,0,0.676,0.304,0.676,0.676S12.846,8.645,12.474,8.645"></path>
    </svg>
);


function undoChange() {
    this.quill.history.undo();
}
function redoChange() {
    this.quill.history.redo();
}


const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);


const Font = Quill.import("formats/font");
Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "Inter",
    "lucida"
];
Quill.register(Font, true);


function imageHandler() {
    const tooltip = this.quill.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;

    tooltip.save = function () {
        const range = this.quill.getSelection(true);
        const value = this.textbox.value;
        if (value) {
            this.quill.insertEmbed(range.index, 'image', value, 'user');
        }
    };
    
    tooltip.hide = function () {
        tooltip.save = originalSave;
        tooltip.hide = originalHide;
        tooltip.hide();
    };
    tooltip.edit('image');
    tooltip.textbox.placeholder = 'Embed URL';
}

function videoHandler() {
    const tooltip = this.quill.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;

    tooltip.save = function () {
        const range = this.quill.getSelection(true);
        const value = this.textbox.value;
        if (value) {
            this.quill.insertEmbed(range.index, 'video', value, 'user');
        }
    };
    
    tooltip.hide = function () {
        tooltip.save = originalSave;
        tooltip.hide = originalHide;
        tooltip.hide();
    };
    tooltip.edit('video');
    tooltip.textbox.placeholder = 'Embed URL';
}



export const modules = (props) => ({
    toolbar: {
        container: "#" + props,
        handlers: {
            undo: undoChange,
            redo: redoChange,
            imageHandler: imageHandler,
            videoHandler: videoHandler
        }
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    }
});


export const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "code-block",
];


export const QuillToolbar = (props) => {
    return (<>
        {props.toolbarId !== undefined &&
            <div id={props.toolbarId}>

                <span className="ql-formats">
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                </span>
                <span className="ql-formats">
                    <select className="ql-font">
                        <option value="arial" > Arial </option>
                        <option value="nunito" > Nunito </option>
                        <option value="comic-sans">Comic Sans</option>
                        <option value="courier-new">Courier New</option>
                        <option value="georgia">Georgia</option>
                        <option value="helvetica">Helvetica</option>
                        <option value="Inter" selected>Inter</option>
                        <option value="lucida">Lucida</option>
                    </select>
                    <select className="ql-size">
                        <option value="extra-small">Extra Small</option>
                        <option value="small">Small</option>
                        <option value="medium" selected>Medium</option>
                        <option value="large">Large</option>
                    </select>
                    <select className="ql-header">
                        <option value="1">Heading 1</option>
                        <option value="2">Heading 2</option>
                        <option value="3">Heading 3</option>
                        <option value="4">Heading 4</option>
                        <option value="5">Heading 5</option>
                        <option value="6">Heading 6</option>
                        <option value="" selected>Normal</option>
                    </select>
                </span>
                <span className="ql-formats">
                    <button className="ql-list" value="ordered" />
                    <button className="ql-list" value="bullet" />
                    <button className="ql-indent" value="-1" />
                    <button className="ql-indent" value="+1" />
                </span>
                <span className="ql-formats">
                    <button className="ql-script" value="super" />
                    <button className="ql-script" value="sub" />
                    <button className="ql-blockquote" />
                    <button className="ql-direction" />
                </span>
                <span className="ql-formats">
                    <select className="ql-align" />
                    <select className="ql-color" />
                    <select className="ql-background" />
                </span>
                <span className="ql-formats">
                    <button className="ql-link" />
                    <button className="ql-imageHandler">
                        <AddPhotoAlternateRoundedIcon />
                    </button>
                    <button className="ql-videoHandler">
                        <PlayCircleIcon />
                    </button>
                </span>
                <span className="ql-formats">
                    <button className="ql-formula" />
                    <button className="ql-code-block" />
                    <button className="ql-clean" />
                </span>
                <span className="ql-formats">
                    <button className="ql-undo">
                        <UndoRoundedIcon />
                    </button>
                    <button className="ql-redo">
                        <RedoRoundedIcon />
                    </button>

                </span>
            </div>
        }
    </>)
}
export default QuillToolbar;