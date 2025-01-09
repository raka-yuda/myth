import React from 'react';
import { MDXRemote } from 'next-mdx-remote';

const components = {
  // Main article title
  h1: (props) => {
    const id = props?.children.toLowerCase().replace(/[^\w]+/g, '-');
    return <h1
      id={id}
      className="text-4xl font-bold text-gray-900 mb-6"
      {...props}
    />
  },

  // Section headers
  h2: (props) => {
    const id = props?.children.toLowerCase().replace(/[^\w]+/g, '-');
    return <h2
      id={id}
      className="text-3xl font-semibold text-gray-800 mb-4"
      {...props}
    />
  },

  // Subsection headers
  h3: (props) => {
    const id = props?.children.toLowerCase().replace(/[^\w]+/g, '-');
    return <h3
      id={id}
      className="text-2xl font-medium text-gray-800 mb-3"
      {...props}
    />
  },

  // Article body text
  p: (props) => (
    <p
      className="text-xl text-gray-700 mb-6 leading-relaxed"
      {...props}
    />
  ),

  // Inline links
  a: (props) => (
    <a
      className="text-blue-600 hover:text-blue-800 underline"
      {...props}
    />
  ),

  // Images with subtle border and shadow
  img: (props) => (
    <div className="my-8">
      <img
        className="rounded-lg shadow-md w-full"
        {...props}
      />
    </div>
  ),

  // Blockquotes for featured text
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-gray-200 pl-4 my-6 italic text-gray-700"
      {...props}
    />
  ),

  // Unordered lists
  ul: (props) => (
    <ul
      className="list-disc ml-6 my-6 space-y-2 text-gray-700"
      {...props}
    />
  ),

  // Ordered lists
  ol: (props) => (
    <ol
      className="list-decimal ml-6 my-6 space-y-2 text-gray-700"
      {...props}
    />
  ),

  // List items
  li: (props) => (
    <li
      className="text-lg leading-relaxed"
      {...props}
    />
  ),

  // Code blocks
  pre: (props) => (
    <pre
      className="bg-gray-50 rounded-lg p-4 my-6 overflow-x-auto"
      {...props}
    />
  ),

  // Inline code
  code: (props) => (
    <code
      className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono"
      {...props}
    />
  ),

  // Table styles
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table
        className="min-w-full divide-y divide-gray-200"
        {...props}
      />
    </div>
  ),

  th: (props) => (
    <th
      className="px-6 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-900"
      {...props}
    />
  ),

  td: (props) => (
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
      {...props}
    />
  ),

  // Horizontal rule
  hr: () => (
    <hr className="my-8 border-t border-gray-200" />
  ),
};

const StoryMDXRenderer = ({ content, metadata }) => {
  const { title, date, category, translations } = metadata;

  console.log("metadata: ", metadata)

  return (
    <article className="max-w-4xl mx-auto bg-white prose prose-lg">
      {/* <header className="mb-6">
        <h1 className="text-5xl font-bold text-purple-600 mb-2">{title}</h1>
        <p className="text-sm text-gray-500">
          {new Date(date).toLocaleDateString()} | {category}
        </p>
        <p className="text-sm text-gray-500">
          Available in: {translations.join(', ')}
        </p>
      </header> */}
      <div className="prose prose-lg prose-headings:font-display max-w-full">
        <MDXRemote {...content} components={components} />
      </div>
    </article>
  );
};

export default StoryMDXRenderer;