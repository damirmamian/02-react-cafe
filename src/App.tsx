import css from "./App.module.css"
import { useState } from 'react';
import CafeInfo from "./components/CafeInfo/CafeInfo"
import VoteOptions from "./components/VoteOptions/VoteOptions.tsx";
import type { Votes, VoteType } from "./types/votes.ts"
import VoteStats from "./components/VoteStats/VoteStats.tsx";
import { Notification } from "./components/Notification/Notification.tsx";

function App() {

  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0
  })

  function handleVote(type: VoteType) {
    setVotes((vote => ({
      ...vote,
      [type]: vote[type] + 1
    })))
  }

  function resetVotes() {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0
    })

  }

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes > 0
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;


  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0} />
      {totalVotes > 0 && <VoteStats
        votes={votes}
        totalVotes={totalVotes}
        positiveRate={positiveRate}
      />}
      {totalVotes == 0 && <Notification />}
    </div>
  )
}

export default App
