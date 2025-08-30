// TODO: individual todo page
// PATH: /todos/123 (where 123 is the todo ID)

export default function TodoPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Todo #{params.id}</h1>
      {/* Add individual todo view/edit implementation here */}
    </div>
  )
}
