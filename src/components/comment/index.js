import { memo, useState } from "react";
import './style.css';
import { convertDate } from "../../utils/convert-date";
import { Link } from "react-router-dom";

function Comment({ comment, currentComment, setCurrentComment, addComment, exists, userId }) {
    const [commentText, setCommentText] = useState('')

    function submitComment(id) {
        addComment(commentText, { _id: id, _type: 'comment' });
        setCurrentComment('');
    }


    return (
        <div className='Comment'>
            <div className='Comment-container'>
                <h4 className={userId !== comment.author._id ? 'Comment-author' : 'Comment-author-active'}>{comment.author.profile.name}</h4>
                <p className='Comment-date'>{convertDate(comment.dateCreate)}</p>
            </div>
            <p className="Comment-text">{comment.text}</p>
            {currentComment !== comment._id ?
                <button className='Comment-button-reply' onClick={() => setCurrentComment(comment._id)}>Ответить</button>
                :
                <>
                    {exists ?
                        <>
                            <textarea type='text' placeholder='Текст' className='Comments-input' onChange={(e) => setCommentText(e.target.value)} />
                            <div className='Comment-buttons-container'>
                                <button className="Comments-button" onClick={() => submitComment(comment._id)}>Отправить</button>
                                <button className="Comments-button" onClick={() => setCurrentComment('')}>Отмена</button>
                            </div>
                        </>
                        :
                        <>
                            <button className='Comment-button-reply' onClick={() => setCurrentComment(comment._id)}>Ответить</button>
                            <p className='Comments-login'>
                                <Link to='/login'>Войдите</Link>
                                , чтобы иметь возможность ответить.
                                <button className='Comment-login-cancel' onClick={() => setCurrentComment('')}>Отмена.</button>
                            </p>
                        </>

                    }
                </>
            }
            {comment.children.length > 0 && (
                <div className={comment.parent._tree.length < 7 ? 'Comment-reply' : ''}>
                    {comment.children.map((childComment) => (
                        <Comment comment={childComment} key={childComment._id} currentComment={currentComment} setCurrentComment={setCurrentComment} addComment={addComment} userId={userId} exists={exists}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default memo(Comment);