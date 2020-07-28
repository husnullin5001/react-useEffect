import React, { useState, useEffect } from 'react';

function App() {
  const [resourceType, setResourceType] = useState('posts')
  const [item, setItem] = useState({})
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    console.log('onMount')

    console.log('add event listener on window resize')
    window.addEventListener('resize', handleResize)

    return () => {
      console.log('remove event listener on window resize')
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // console.log('Render RFC')

  useEffect(() => {
    console.log('resourceType changed')
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}/1`)
      .then(response => response.json())
      .then(json => setItem(json))

    return () => {
      console.log('return from resourceType change')
    }
  }, [resourceType])

  // useEffect(() => {
  //   console.log('onMount')
  // }, [])

  // useEffect(() => {
  //   console.log('Render Complete Component')
  // })

  return (
    <>
      <div>Window Inner Width: {windowWidth}</div>
      <div>
        <button onClick={() => setResourceType('posts')}>1-st Post</button>
        <button onClick={() => setResourceType('users')}>1-st User</button>
        <button onClick={() => setResourceType('comments')}>1-st Comment</button>
      </div>
      <h1>{resourceType}</h1>
      {JSON.stringify(item)}
    </>
  );
}

export default App;
