import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Placeholder from '@tiptap/extension-placeholder';

const TextEditor = ({ text, setText }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      BulletList,
      ListItem,
      Placeholder.configure({
        placeholder: 'Enter text here...',
      }),
    ],
    content: text,
    onUpdate: ({ editor }) => {
      const updatedText = editor.getHTML();
      if (updatedText !== text) {
        setText(updatedText);
      }
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== text) {
      editor.commands.setContent(text);
    }
  }, [text, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="editor-toolbar flex space-x-2 mb-4">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 border rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 border rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 border rounded ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
        >
          Underline
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="border p-1 rounded outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default TextEditor;