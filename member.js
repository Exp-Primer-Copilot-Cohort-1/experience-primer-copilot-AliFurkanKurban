function skillsMember() {
  return {
    name: "John",
    age: 30,
    skills: ["HTML", "CSS", "JS"],
    greet: function() {
      console.log(`Hello ${this.name}`);
    }
  };
}