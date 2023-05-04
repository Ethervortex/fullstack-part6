import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  //const anecdotes = useSelector(state => state.notes.sort((a, b) => b.votes - a.votes))
  const anecdotes = useSelector(state => {
    const filter = state.filter.toLowerCase()
    const filteredAnecdotes = state.notes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter)
    )
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(voteAnecdote({ id }))
    dispatch(setNotification(`You voted: "${content}"`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList