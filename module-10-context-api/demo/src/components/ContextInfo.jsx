export function ContextInfo() {
  return (
    <>
      <div className="info-box">
        <h3>Context API Pattern</h3>
        <ol>
          <li>
            <strong>Create</strong>: createContext() to make a context
          </li>
          <li>
            <strong>Provide</strong>: Wrap components in Provider
          </li>
          <li>
            <strong>Consume</strong>: Use useContext hook in children
          </li>
          <li>
            <strong>Custom Hook</strong>: Wrap useContext for safety
          </li>
        </ol>
      </div>

      <div className="info-box">
        <h3>Benefits</h3>
        <ul>
          <li>No prop drilling through intermediate components</li>
          <li>Global state accessible anywhere in tree</li>
          <li>Easy to test with separate provider</li>
        </ul>
      </div>
    </>
  );
}
