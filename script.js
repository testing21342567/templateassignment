const form = document.getElementById("cover-form");
const printBtn = document.getElementById("printBtn");
const resetBtn = document.getElementById("resetBtn");

const fields = {
  assignmentName: {
    input: document.getElementById("assignmentName"),
    output: document.getElementById("previewAssignment"),
    fallback: "ASSIGNMENT NAME",
    transform: (value) => value.toUpperCase()
  },
  subject: {
    input: document.getElementById("subject"),
    output: document.getElementById("previewSubject"),
    fallback: "Subject"
  },
  submittedTo: {
    input: document.getElementById("submittedTo"),
    output: document.getElementById("previewSubmittedTo"),
    fallback: "Teacher",
    transform: (value) => value.split(",").map((part) => part.trim()).filter(Boolean).join("\n")
  },
  submittedBy: {
    input: document.getElementById("submittedBy"),
    output: document.getElementById("previewSubmittedBy"),
    fallback: "Student name\nRegister Number\nClass",
    transform: (value) => value.split(",").map((part) => part.trim()).join("\n")
  }
};

function fitTextToBox(element) {
  const min = Number(element.dataset.minSize || 14);
  const max = Number(element.dataset.maxSize || 48);
  element.style.fontSize = `${max}px`;

  while (
    (element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) &&
    parseFloat(element.style.fontSize) > min
  ) {
    element.style.fontSize = `${parseFloat(element.style.fontSize) - 1}px`;
  }
}

function updatePreview() {
  Object.values(fields).forEach(({ input, output, fallback, transform }) => {
    const rawValue = input.value.trim() || fallback;
    const value = transform ? transform(rawValue) : rawValue;
    output.textContent = value;
    fitTextToBox(output);
  });
}

Object.values(fields).forEach(({ input }) => {
  input.addEventListener("input", updatePreview);
});

window.addEventListener("resize", updatePreview);
printBtn.addEventListener("click", () => {
  updatePreview();
  window.print();
});

resetBtn.addEventListener("click", () => {
  form.reset();
  updatePreview();
});

updatePreview();
