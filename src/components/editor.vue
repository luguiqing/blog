<style scoped lang="scss">
#editor_container{

}
</style>
<template>
    <div id="editor_container">
        <quill-editor v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>

<script>
import Quill from 'quill';
import { ImageResize }from '../utils/ImageResize';
import { quillEditor } from 'vue-quill-editor';


Quill.register('modules/imageResize', ImageResize);

export default {
    name: "editor",
    components: {
        quillEditor : quillEditor
    },
    props:{
        html: {
            type    :   String,
            default :   ''
        }
    },
    data () {
        return {
            content: this.html,
            editorOption: {
                // some quill options
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'font': [] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                        ['clean'],
                        ['link', 'image']//video去掉
                    ],
                    imageResize: {
                        displaySize: true
                    }
                }
            }
        }
    },
    methods: {
        onEditorReady(event){

        },
        onEditorChange(event){
            //console.log(event)
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    watch: {
        html(newVal, oldVal){
            this.content = newVal;
        }
    }
}
</script>