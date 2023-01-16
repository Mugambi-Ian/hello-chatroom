
import { trpc } from '../utils/trpc';

export default function IndexPage() {
  const result = trpc.greeting.useQuery({ name: 'client' });

  if (!result.data) {
    return (
      <div className='flex container w-screen h-screen'>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className='flex container w-screen h-screen'>
      <h1 className='font-bold text-5xl m-auto'>{result.data.text}</h1>
    </div>
  );
}