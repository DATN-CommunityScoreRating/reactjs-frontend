import SummernoteLite from 'react-summernote-lite';
import 'react-summernote-lite/dist/dist/lang/summernote-vi-VN.min';
import './style.scss';

const Editor = ({ onChange }) => {
    return (
        <div>
            <SummernoteLite
                defaultCodeValue={''}
                placeholder={'Write something here...'}
                tabsize={2}
                lang="vi-VN"
                dialogsInBody={true}
                blockquoteBreakingLevel={0}
                toolbar={[
                    ['style', ['style']],
                    [
                        'font',
                        [
                            'bold',
                            'underline',
                            'clear',
                            'strikethrough',
                            // 'superscript',
                            // 'subscript',
                        ],
                    ],
                    ['fontsize', ['fontsize']],
                    ['fontname', ['fontname']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture', 'video', 'hr']],
                    // ['view', ['fullscreen', 'codeview', 'help']],
                ]}
                fontNames={['Arial', 'Georgia', 'Verdana', 'e.t.c...']}
                callbacks={{
                    onKeyup: function (e) {},
                    onKeyDown: function (e) {},
                    onPaste: function (e) {},
                    onChange: function (e) {
                        onChange(e);
                    },
                }}
                useDiv={false}
            />
        </div>
    );
};

export default Editor;
