import React, { useEffect } from "react";

function NotificationDialog(props: { value: string }) {

  const initialList: { id: number, value: string }[] = []
  const listReference = React.useRef(initialList);


  useEffect(() => {
    const { current: listValue } = listReference;
    // Scroll to bottom
    function scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight)
    }

    function addNewValue(localValue: string) {
      console.log("VALUE", props.value, localValue);
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
          <li key={item.id} className="text-yellow text-5xl font-bold m-20">{item.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationDialog;