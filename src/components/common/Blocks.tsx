import type { Block } from '../../types/content'
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        block.type === 'list' ? (
          <ul key={i}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : block.type === 'heading' ? (
          <h2 key={i}>{block.text}</h2>
        ) : block.type === 'notice' ? (
          <aside className="notice" key={i}>
            {block.text}
          </aside>
        ) : (
          <p key={i}>{block.text}</p>
        ),
      )}
    </>
  )
}
