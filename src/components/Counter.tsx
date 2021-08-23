import React, { useEffect } from "react";

function Counter(props: { value: string }) {

  const initialList: { id: number, value: string }[] = []
  const listReference = React.useRef(initialList);


  useEffect(() => {
    const { current: listValue } = listReference;
    // Scroll to bottom
    function scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight)
    }

    function addNewValue(localValue: string) {
      if (localValue == null || localValue === "") {
        return;
      }
      listReference.current = listValue.concat({ id: listValue.length, value: localValue });
    }

    addNewValue(props.value)
    scrollToBottom();
  }, [props.value])

  return (
    <div>
      <ul>
        {listReference.current.map((item) => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default Counter;