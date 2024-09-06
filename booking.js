// IIFE to encapsulate the entire application
(() => {
    // Utility functions
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);
  
    // Helper function to format date
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    // Data (copied from bornian.js)
    const physicians = [
      { id: 1, name: 'Dr. Abdul', specialization: 'General Practice', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 2, name: 'Dr. Jackson', specialization: 'Cardiology', availableDays: ['Tuesday', 'Thursday'] },
      { id: 3, name: 'Dr. Brown', specialization: 'Pediatrics', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 4, name: 'Dr. Ayo', specialization: 'Dermatology', availableDays: ['Tuesday', 'Thursday'] },
      { id: 5, name: 'Dr. Fred', specialization: 'Orthopedics', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 6, name: 'Dr. Samad', specialization: 'Neurology', availableDays: ['Tuesday', 'Thursday'] },
      { id: 7, name: 'Dr. Hauwa', specialization: 'Gastroenterology', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 8, name: 'Dr. Anne', specialization: 'Urology', availableDays: ['Tuesday', 'Thursday'] },
      { id: 9, name: 'Dr. Jennifer', specialization: 'Endocrinology', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 10, name: 'Dr. Dami', specialization: 'Psychiatry', availableDays: ['Tuesday', 'Thursday'] },
      { id: 11, name: 'Dr. David', specialization: 'Dentistry', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      // ... (other physicians)
    ];
  
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    // State
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let selectedPhysician = physicians[0];
    let selectedDate = null;
  
    // Components
    const PhysicianSelect = () => `
      <select id="physicianSelect" class="w-full p-2 border rounded">
        ${physicians.map(p => `<option value="${p.id}">${p.name} - ${p.specialization}</option>`).join('')}
      </select>
    `;
  
    const Calendar = (physician, year, month) => {
      const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
      const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();
  
      const daysInMonth = getDaysInMonth(month, year);
      const firstDay = getFirstDayOfMonth(month, year);
  
      let calendarHTML = `
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="flex items-center justify-between px-6 py-2 bg-gray-50">
            <button id="prevMonth" class="text-gray-600 hover:text-gray-800">&lt;</button>
            <span class="text-lg font-bold text-gray-800">
              ${monthNames[month]} ${year}
            </span>
            <button id="nextMonth" class="text-gray-600 hover:text-gray-800">&gt;</button>
          </div>
          <div class="grid grid-cols-7 gap-px bg-gray-200">
            ${daysOfWeek.map(day => `<div class="bg-white text-center py-2 text-sm font-semibold text-gray-600">${day}</div>`).join('')}
      `;
  
      for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div class="bg-white"></div>';
      }
  
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayName = date.toLocaleString('en-us', {weekday: 'long'});
        const isAvailable = physician.availableDays.includes(dayName);
        const cellClass = isAvailable
          ? 'bg-green-100 hover:bg-green-200 cursor-pointer'
          : 'bg-gray-100 text-gray-400 cursor-not-allowed';
  
        calendarHTML += `
          <div class="${cellClass} text-center py-2 text-sm" data-date="${formatDate(date)}" ${isAvailable ? '' : 'disabled'}>
            ${day}
          </div>
        `;
      }
  
      calendarHTML += `
        </div>
      </div>
      `;
  
      return calendarHTML;
    };
  
    const AppointmentForm = () => `
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Select a Physician</h2>
        ${PhysicianSelect()}
        <h2 class="text-xl font-semibold">Select a Date</h2>
        <div id="calendar"></div>
        <h2 class="text-xl font-semibold">Select a Time</h2>
        <input type="time" id="timeInput" class="w-30 p-2 border rounded" required>
        <button id="bookAppointment" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">Schedule an Appointment</button>
      </div>
    `;
  
    const ReceiptModal = (physician, date, time, message) => `
      <div id="receiptModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 class="text-2xl font-bold mb-4">Appointment Receipt</h2>
          <p><strong>Physician:</strong> ${physician.name}</p>
          <p><strong>Specialization:</strong> ${physician.specialization}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p class="mt-4"><strong>Note:</strong> ${message}</p>
          <div class="mt-6 flex justify-between">
            <button id="printReceipt" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Print Receipt</button>
            <button id="downloadReceipt" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">Download Receipt</button>
          </div>
          <button id="closeModal" class="mt-4 w-full bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors">Close</button>
        </div>
      </div>
    `;
  
    // Event handlers
    const handlePhysicianChange = (e) => {
      selectedPhysician = physicians.find(p => p.id === parseInt(e.target.value));
      selectedDate = null;
      updateCalendar();
    };
  
    const handleDateSelection = (e) => {
      if (e.target.dataset.date && !e.target.hasAttribute('disabled')) {
        $$('#calendar .bg-blue-200').forEach(el => el.classList.remove('bg-blue-200'));
        e.target.classList.add('bg-blue-200');
        selectedDate = e.target.dataset.date;
      }
    };
  
    const handleAppointmentSubmit = () => {
      const time = $('#timeInput').value;
      
      if (!selectedDate || !time) {
        alert('Please select a date and time for your appointment.');
        return;
      }
      
      const selectedDay = new Date(selectedDate).toLocaleString('en-us', {weekday: 'long'});
      const isAvailableDay = selectedPhysician.availableDays.includes(selectedDay);
      
      let message = `Appointment booked with ${selectedPhysician.name} on ${selectedDate} at ${time}.`;
      if (!isAvailableDay) {
        message += "\n\nNote: If the selected date is rather full for this physician, you may experience longer wait times or potential rescheduling.";
      }
      
      $('#app').insertAdjacentHTML('beforeend', ReceiptModal(selectedPhysician, selectedDate, time, message));
      setupModalHandlers();
    };
  
    const setupModalHandlers = () => {
      $('#closeModal').addEventListener('click', () => {
        $('#receiptModal').remove();
      });
  
      $('#printReceipt').addEventListener('click', () => {
        window.print();
      });
  
      $('#downloadReceipt').addEventListener('click', () => {
        const receiptContent = $('#receiptModal').innerText;
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'appointment_receipt.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    };
  
    const updateCalendar = () => {
      $('#calendar').innerHTML = Calendar(selectedPhysician, currentYear, currentMonth);
      setupCalendarNavigation();
    };
  
    const setupCalendarNavigation = () => {
      $('#prevMonth').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
        updateCalendar();
      });
  
      $('#nextMonth').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
        updateCalendar();
      });
    };
  
    // Initialization
    const init = () => {
      $('#app').innerHTML = `
        <div class="flex min-h-screen">
          <div class="w-1/2 bg-white bg-opacity-90 p-8 overflow-y-auto">
            <h1 class="text-3xl font-bold mb-6 text-center text-blue-800">Physician Appointment Scheduling</h1>
            <div id="appointmentForm"></div>
          </div>
          <div class="w-1/2"></div>
        </div>
      `;
      $('#appointmentForm').innerHTML = AppointmentForm();
      $('#physicianSelect').addEventListener('change', handlePhysicianChange);
      $('#calendar').addEventListener('click', handleDateSelection);
      $('#bookAppointment').addEventListener('click', handleAppointmentSubmit);
      updateCalendar();
    };
  
    // Start the application
    init();
  })();