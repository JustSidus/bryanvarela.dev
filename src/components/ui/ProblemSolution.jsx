/**
 * ProblemSolution — displays paired problem/solution blocks.
 *
 * @param {Object[]} pairs - Array of { problem, solution } where each is a string
 */
export function ProblemSolution({ pairs }) {
  return (
    <div className="ps">
      {pairs.map((pair, i) => (
        <React.Fragment key={i}>
          <div className="problem">
            <h4>// problema</h4>
            <p>{pair.problem}</p>
          </div>
          <div className="solution">
            <h4>// solución</h4>
            <p>{pair.solution}</p>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}