import { SUGGESTED_QUESTIONS } from '../knowledge';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled: boolean;
}

export function SuggestedQuestions({ onSelect, disabled }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-1 pt-1" role="group" aria-label="Suggested questions">
      {SUGGESTED_QUESTIONS.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          disabled={disabled}
          className="text-[13px] font-medium px-3.5 py-2 rounded-full bg-sun-100 text-sun-700 dark:bg-sun-900/30 dark:text-sun-300 hover:brightness-105 active:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px]"
        >
          {question}
        </button>
      ))}
    </div>
  );
}
