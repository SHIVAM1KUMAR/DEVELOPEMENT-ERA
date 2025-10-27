import Student from "./Student";

function App() {
  const studentList = [
    { id: 1, name: "Shivam", age: 21 },
    { id: 2, name: "Rahul", age: 22 },
    { id: 3, name: "Priya", age: 20 }
  ];

  return (
    <div>
      <h1>All Students</h1>
      {studentList.map((s) => (
        <Student key={s.id} name={s.name} age={s.age} />
      ))}
    </div>
  );
}

export default App;
