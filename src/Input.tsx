function Input() {
  return (
    <div id="input-container">
      <p> 오늘의 할일을 추가 </p>
      <input
        type="text"
        autoFocus={true}
        placeholder={"할일을 추가해주세요."}
        size={30}
      />
    </div>
  );
}

export default Input;
