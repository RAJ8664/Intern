import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 0,
  },
}

function ChapterContent({ chapter, content }) {
  return (
    <div className='p-10 space-y-10'>
      {/* Chapter Title and Description */}
      <h2 className='font-semibold text-2xl text-purple-500'>
        {chapter?.chapter_name}
      </h2>
      <p className='text-gray-500'>{chapter?.about}</p>

      {/* Youtube Video Content */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            border: '2px solid purple',
            width: '640px',
            height: '390px',
            boxSizing: 'content-box',
          }}
        >
          <YouTube
            key={content?.videoId}
            videoId={content?.videoId}
            opts={opts}
          />
        </div>
      </div>

      {/* Content List */}
      <div className='space-y-5'>
        {Array.isArray(content?.content) &&
          content.content.map((item, index) => (
            <div
              key={item.id ?? index}
              className='p-5 bg-sky-50 rounded-md shadow-md space-y-4'
            >
              {/* Title */}
              <h3 className='font-semibold text-lg text-purple-500'>
                {item.title}
              </h3>

              {/* Explanation */}
              {item.explanation && (
                <div className='prose'>
                  {<ReactMarkdown>{item.explanation}</ReactMarkdown>}
                </div>
              )}

              {/* Steps */}
              {item.steps && item.steps.length > 0 && (
                <div className='p-4 bg-gray-900 text-gray-50 mt-3 rounded-md overflow-auto prose prose-inverted space-y-2'>
                  {item.steps.map((step, i) => (
                    <ReactMarkdown key={i}>{step}</ReactMarkdown>
                  ))}
                </div>
              )}

              {/* Code */}
              {item.code && (
                <div className='p-4 bg-gray-900 text-gray-50 mt-3 rounded-md overflow-auto'>
                  <pre>
                    <code dangerouslySetInnerHTML={{ __html: item.code }} />
                  </pre>
                </div>
              )}

              {/* Issues Section */}
              {item.issues &&
                item.issues.length > 0 &&
                item.issues.map((issue, i) => (
                  <div
                    key={i}
                    className='bg-yellow-50 p-4 mt-3 rounded-md border border-yellow-500 prose space-y-2'
                  >
                    <h4 className='font-semibold'>{issue.issue}</h4>
                    <ReactMarkdown>{issue.solution}</ReactMarkdown>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default ChapterContent
