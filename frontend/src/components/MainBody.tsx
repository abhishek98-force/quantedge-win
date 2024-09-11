import { useState } from 'react';

export default function MainBody() {
  const [trivia, setTrivia] = useState<string>('');
  async function handleTrivia() {
    const response = await fetch('http://localhost:8000/api/trivia');
    console.log(response);
    const data = await response.json();
    setTrivia(data.trivia);
  }
  return (
    <div className="pt-12 flex flex-col justify-center items-center h-screen">
      <div className="text-3xl mb-2">Trivia of the day !!</div>
      <button
        className="bg-blue-400 text-white rounded p-3 mb-10"
        onClick={handleTrivia}
      >
        Generate Trivia
      </button>
      <div className="text-2xl bg-yellow-200 p-5">{trivia}</div>
    </div>
  );
}
