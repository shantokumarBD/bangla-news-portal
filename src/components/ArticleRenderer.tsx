import React from 'react';
import Image from 'next/image';

// Helper to extract text from JSON object for the subtitle
export const extractText = (content: any): string => {
  if (!content) return "";
  if (typeof content === 'string') return content;
  
  if (Array.isArray(content)) {
    const paragraphs = content.filter((b: any) => b.type === 'text' || b.type === 'paragraph');
    if (paragraphs.length > 0) {
       return (paragraphs[0].text || paragraphs[0].data?.text || '').replace(/<[^>]*>?/gm, '');
    }
  }

  if (typeof content === 'object' && content.blocks && Array.isArray(content.blocks)) {
    const paragraphs = content.blocks.filter((b: any) => b.type === 'paragraph');
    if (paragraphs.length > 0) {
       return paragraphs[0].data.text.replace(/<[^>]*>?/gm, '');
    }
  }
  return "";
};

interface ArticleRendererProps {
  content: any;
}

const ArticleRenderer = ({ content }: ArticleRendererProps) => {
  if (!content) return null;
  
  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  let blocksToRender = [];
  let isEditorJs = false;

  if (Array.isArray(content)) {
    blocksToRender = content;
  } else if (typeof content === 'object' && content.blocks && Array.isArray(content.blocks)) {
    blocksToRender = content.blocks;
    isEditorJs = true;
  } else {
    return <p className="break-words">{JSON.stringify(content)}</p>;
  }

  return (
    <>
      {blocksToRender.map((block: any, index: number) => {
        let type = block.type;
        let htmlText = isEditorJs ? (block.data?.text || '') : (block.text || '');

        switch (type) {
          case 'text':
          case 'paragraph':
            return <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: htmlText }} />;
            
          case 'subheading':
          case 'header':
            if (isEditorJs) {
              const level = block.data?.level || 2;
              const HeaderTag = `h${level}` as any;
              return <HeaderTag key={index} className="font-bold text-2xl mt-8 mb-4 text-gray-900" dangerouslySetInnerHTML={{ __html: htmlText }} />;
            }
            return <h2 key={index} className="font-bold text-2xl mt-8 mb-4 text-gray-900" dangerouslySetInnerHTML={{ __html: htmlText }} />;
            
          case 'image':
            const imgUrl = isEditorJs ? (block.data?.file?.url || block.data?.url) : block.url;
            const caption = isEditorJs ? block.data?.caption : block.caption;
            if (!imgUrl) return null;
            
            return (
              <div key={index} className="my-8 w-full">
                <Image 
                  src={imgUrl} 
                  alt={caption || block.altText || "Article Image"} 
                  width={800} 
                  height={500} 
                  className="w-full h-auto object-cover rounded-md" 
                />
                {caption && <p className="text-center text-sm text-gray-500 mt-2">{caption}</p>}
              </div>
            );
            
          case 'list':
            if (isEditorJs && block.data?.items) {
              const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
              return (
                <ListTag key={index} className={block.data.style === 'ordered' ? 'list-decimal pl-5' : 'list-disc pl-5'}>
                  {block.data.items.map((item: string, i: number) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ListTag>
              );
            }
            return null;
            
          case 'quote':
            const quoteCaption = isEditorJs ? block.data?.caption : block.caption;
            return (
              <blockquote key={index} className="border-l-4 border-red-500 pl-4 italic my-6 text-gray-700 bg-gray-50 py-2 pr-2">
                <p dangerouslySetInnerHTML={{ __html: htmlText }} />
                {quoteCaption && <footer className="text-sm mt-2 font-semibold">- {quoteCaption}</footer>}
              </blockquote>
            );
            
          default:
            if (htmlText) {
              return <div key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: htmlText }} />;
            }
            return null;
        }
      })}
    </>
  );
};

export default ArticleRenderer;
