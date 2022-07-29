import React, { useState, useEffect, useRef } from 'react';
import Picker from 'emoji-picker-react';

const CreateComment = ({ user }) => {
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState('');
  const [commentImage, setcommentImage] = useState('');
  const [error, setError] = useState('');
  const [cursorPosition, setCursorPosition] = useState(null);
  const textRef = useRef(null);
  const imgInput = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handleImage = (e) => {
    let file = e.target.files[0];

    if (file.type !== ('image/jpeg' || 'image/png' || 'image/webp' || 'image/gif')) {
      setError(`${file.name} format is unsupported!`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError('File size exceeds 5mb.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      setcommentImage(readerEvent.target.result);
    };
  };

  return (
    <div className='create_comments_wrap'>
      <div className='create_comment'>
        <img src={user?.picture} alt='' />
        <div className='comment_input_wrap'>
          {picker && (
            <div className='comment_emoji_picker'>
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}

          <input
            type='file'
            hidden
            ref={imgInput}
            accept='image/jpeg, image/png, image/webp, image/gif'
            onChange={handleImage}
          />
          {error && (
            <div className='postError comment_error'>
              <div className='postError_error'>{error}</div>
              <button className='blue_btn' onClick={() => setError('')}>
                Try Again
              </button>
            </div>
          )}
          <input
            type='text'
            ref={textRef}
            value={text}
            placeholder='Write a comment...'
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className='comment_circle_icon hover2'
            onClick={() => setPicker((prev) => !prev)}
          >
            <i className='emoji_icon'></i>
          </div>
          <div
            className='comment_circle_icon hover2'
            onClick={() => imgInput.current.click()}
          >
            <i className='camera_icon'></i>
          </div>
          <div className='comment_circle_icon hover2'>
            <i className='gif_icon'></i>
          </div>
          <div className='comment_circle_icon hover2'>
            <i className='sticker_icon'></i>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className='comment_img_preview'>
          <img src={commentImage} alt='' />
          <div className='small_white_circle' onClick={() => setcommentImage('')}>
            <i className='exit_icon'></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateComment;
