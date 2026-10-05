const express = require('express');
const students = require('../data/students');

const router = express.Router();

// ---------- Helpers ----------
const isValidText = (value) =>
  typeof value === 'string' && value.trim().length > 0;

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

// ---------- GET /students : all students ----------
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// ---------- GET /students/:id : single student ----------
router.get('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid student ID. ID must be a positive number.' });
  }

  const student = students.find((s) => s.id === id);
  if (!student) {
    return res
      .status(404)
      .json({ success: false, message: `Student with ID ${id} not found` });
  }

  res.status(200).json({ success: true, data: student });
});

// ---------- POST /students : create student ----------
router.post('/', (req, res) => {
  const { name, course } = req.body || {};

  if (!isValidText(name) || !isValidText(course)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input. "name" and "course" are required non-empty strings.'
    });
  }

  const newId = students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1;
  const newStudent = { id: newId, name: name.trim(), course: course.trim() };
  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student created successfully',
    data: newStudent
  });
});

// ---------- PUT /students/:id : update student ----------
router.put('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid student ID. ID must be a positive number.' });
  }

  const { name, course } = req.body || {};
  if (!isValidText(name) || !isValidText(course)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input. "name" and "course" are required non-empty strings.'
    });
  }

  const student = students.find((s) => s.id === id);
  if (!student) {
    return res
      .status(404)
      .json({ success: false, message: `Student with ID ${id} not found` });
  }

  student.name = name.trim();
  student.course = course.trim();

  res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: student
  });
});

// ---------- DELETE /students/:id : delete student ----------
router.delete('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid student ID. ID must be a positive number.' });
  }

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: `Student with ID ${id} not found` });
  }

  const [deleted] = students.splice(index, 1);

  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: deleted
  });
});

module.exports = router;
