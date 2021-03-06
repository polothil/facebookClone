import React, { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';

const EmojiPickerBackground = ({
  text,
  setText,
  user,
  type2,
  background,
  setBackground,
}) => {
  const [picker, setPicker] = useState(false);
  const [showBgs, setShowBgs] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

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

  const postBackgrounds = [
    '../../../images/postBackgrounds/1.jpg',
    '../../../images/postBackgrounds/2.jpg',
    '../../../images/postBackgrounds/3.jpg',
    '../../../images/postBackgrounds/4.jpg',
    '../../../images/postBackgrounds/5.jpg',
    '../../../images/postBackgrounds/6.jpg',
    '../../../images/postBackgrounds/7.jpg',
    '../../../images/postBackgrounds/8.jpg',
    '../../../images/postBackgrounds/9.jpg',
  ];

  const backgroundHandler = (index) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[index]})`;
    setBackground(postBackgrounds[index]);
    bgRef.current.classList.add('bgHandler');
  };

  const removeBackground = () => {
    bgRef.current.style.backgroundImage = ``;
    setBackground('');
    bgRef.current.classList.remove('bgHandler');
  };

  return (
    <div className={type2 ? 'images_input' : ''}>
      <div className={!type2 ? `flex_center` : ''} ref={bgRef}>
        <textarea
          ref={textRef}
          maxLength='250'
          value={text}
          placeholder={`What's on your mind, ${user.first_name}`}
          className={`post_input ${type2 && 'input2'}`}
          onChange={(e) => setText(e.target.value)}
          style={{
            paddingTop: `${
              background ? Math.abs(textRef.current.value.length * 0.1 - 30) : '0'
            }%`,
          }}
        ></textarea>
      </div>
      <div className={!type2 ? 'post_emojis_wrap' : ''}>
        {picker && (
          <div className={`comment_emoji_picker ${type2 ? 'movepicker2' : 'rlmove'} `}>
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && (
          <img
            src='../../../icons/colorful.png'
            alt=''
            onClick={() => {
              setShowBgs((prev) => !prev);
            }}
          />
        )}
        {!type2 && showBgs && (
          <div className='post-backgrounds'>
            <div className='no_bg' onClick={removeBackground}></div>
            {postBackgrounds.map((bg, idx) => (
              <img
                src={bg}
                key={idx}
                alt=''
                onClick={() => {
                  backgroundHandler(idx);
                }}
              />
            ))}
          </div>
        )}
        <i
          className={`emoji_icon_large ${type2 && 'moveLeft'}`}
          onClick={() => setPicker((prevState) => !prevState)}
        ></i>
      </div>
    </div>
  );
};

export default EmojiPickerBackground;
