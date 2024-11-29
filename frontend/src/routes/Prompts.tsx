import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { fetchPromptStrategies } from '../state/prompts/promptSlice';
import { Strategy } from '../types/prompt-strategies-type';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui/card';

//spinner
import { LoadingSpinner } from '../components/loading-spinner';

export default function Prompts() {
  const promptStrategyState = useSelector(
    (state: RootState) => state.promptStrategy
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log(promptStrategyState);
    if (!promptStrategyState.data || promptStrategyState.data.length === 0) {
      dispatch(fetchPromptStrategies());
    }
  }, [dispatch, promptStrategyState.data]);

  function handleStrategyClick() {
    console.log('handleStrategyClick');
  }

  if (promptStrategyState.status === 'loading') {
    return (
      <div className="mt-10 flex justify-center items-center">
        <LoadingSpinner className="text-neutral-950 dark:text-neutral-50" />
      </div>
    );
  }

  if (promptStrategyState.status === 'error') {
    return (
      <div className="dark:text-white mx-auto font-bold">
        Some error in fetching prompts!!
      </div>
    );
  }
  return (
    <div>
      {promptStrategyState.status === 'succeeded' &&
        promptStrategyState.data && (
          <>
            <div className="text-3xl font-bold dark:text-white">Strategies</div>
            {promptStrategyState.data.map((prompt: Strategy) => (
              <div className="p-5">
                <Card
                  key={prompt.id}
                  className="hover:shadow-xl hover:shadow-gray-500/20 cursor-pointer"
                  onClick={handleStrategyClick}
                >
                  <CardHeader>
                    <CardTitle>{prompt.strategy_name}</CardTitle>
                  </CardHeader>
                  <CardContent>{prompt.description}</CardContent>
                </Card>
              </div>
            ))}
          </>
        )}
    </div>
  );
}
