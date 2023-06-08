import { memo, useState } from "react";
import './style.css';
import Comment from "../comment";
import { Link } from "react-router-dom";

function Comments({ comments, commentsCount, addComment, articleId, exists, userId }) {
    const [text, setText] = useState('')
    const [currentComment, setCurrentComment] = useState('')
    function submitComment(parent) {
        addComment(text, parent);
        setText('');
    }

    return (
        <div className='Comments'>
            <h3 className='Comments-title'>Комментарии ({commentsCount})</h3>
            {comments.map((comment) => (
                <Comment key={comment._id} comment={comment} currentComment={currentComment} setCurrentComment={setCurrentComment} addComment={addComment} exists={exists} userId={userId} />
            ))}
            {currentComment === '' &&
                <div className='Comments-container'>
                    {exists ?
                        <>
                            <h5 className='Comments-subtitle'>Новый комментарий</h5>
                            <textarea type='text' placeholder='Текст' className='Comments-input' value={text} onChange={(e) => setText(e.target.value)} />
                            <button className='Comments-button' onClick={() => submitComment({ _id: articleId, _type: 'article' })}>Отправить</button>
                        </>
                        :
                        <p className='Comments-login'><Link to='/login'>Войдите</Link>, чтобы иметь возможность комментировать</p>
                    }
                </div>}
        </div>
    );
}


export default memo(Comments);