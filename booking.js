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
  
    // Data
    const physicians = [
      { id: 1, name: 'Dr. Abdul', specialization: 'General Practice - full body care and treatment', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 2, name: 'Dr. Jackson', specialization: 'Cardiology - heart care', availableDays: ['Tuesday', 'Thursday'] },
      { id: 3, name: 'Dr. Brown', specialization: 'Pediatrics - child care and health', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 4, name: 'Dr. Ayo', specialization: 'Dermatology - skin care', availableDays: ['Tuesday', 'Thursday'] },
      { id: 5, name: 'Dr. Fred', specialization: 'Orthopedics - bone care', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 6, name: 'Dr. Samad', specialization: 'Neurology - brain care', availableDays: ['Tuesday', 'Thursday'] },
      { id: 7, name: 'Dr. Hauwa', specialization: 'Gastroenterology - stomach care', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 8, name: 'Dr. Anne', specialization: 'Urology - bladder care', availableDays: ['Tuesday', 'Thursday'] },
      { id: 9, name: 'Dr. Jennifer', specialization: 'Endocrinology - hormone care', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 10, name: 'Dr. Dami', specialization: 'Psychiatry - mental health care and counseling', availableDays: ['Tuesday', 'Thursday'] },
      { id: 11, name: 'Dr. David', specialization: 'Dentistry - teeth care', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 12, name: 'Dr. John', specialization: 'Dentistry - teeth care', availableDays: ['Monday', 'Thursday', 'Friday'] },
      { id: 13, name: 'Dr. James', specialization: 'General Practice - full body care and treatment', availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'] },
      { id: 14, name: 'Dr. Sarah', specialization: 'Ophthalmology - eye care', availableDays: ['Tuesday', 'Wednesday', 'Friday'] },
      { id: 15, name: 'Dr. Michael', specialization: 'Oncology - cancer treatment', availableDays: ['Monday', 'Thursday'] },
      { id: 16, name: 'Dr. Emily', specialization: 'Gynecology - women\'s health', availableDays: ['Tuesday', 'Wednesday', 'Friday'] },
      { id: 17, name: 'Dr. Robert', specialization: 'Pulmonology - lung care', availableDays: ['Monday', 'Thursday'] },
      { id: 18, name: 'Dr. Lisa', specialization: 'Rheumatology - joint and autoimmune disorders', availableDays: ['Tuesday', 'Wednesday', 'Friday'] },
      { id: 19, name: 'Dr. Kevin', specialization: 'Nephrology - kidney care', availableDays: ['Monday', 'Thursday'] },
      { id: 20, name: 'Dr. Rachel', specialization: 'Allergy and Immunology - allergy treatment', availableDays: ['Tuesday', 'Wednesday', 'Friday'] },
      { id: 21, name: 'Dr. Emma', specialization: 'Cardiology - heart care', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 22, name: 'Dr. Oliver', specialization: 'Pediatrics - child care and health', availableDays: ['Tuesday', 'Thursday', 'Saturday'] },
      { id: 23, name: 'Dr. Sophia', specialization: 'Dermatology - skin care', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 24, name: 'Dr. Liam', specialization: 'Orthopedics - bone care', availableDays: ['Tuesday', 'Thursday'] },
      { id: 25, name: 'Dr. Ava', specialization: 'Neurology - brain care', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 26, name: 'Dr. Noah', specialization: 'Gastroenterology - stomach care', availableDays: ['Tuesday', 'Thursday', 'Saturday'] },
      { id: 27, name: 'Dr. Isabella', specialization: 'Urology - bladder care', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 28, name: 'Dr. Ethan', specialization: 'Endocrinology - hormone care', availableDays: ['Tuesday', 'Thursday'] },
      { id: 29, name: 'Dr. Mia', specialization: 'Psychiatry - mental health care and counseling', availableDays: ['Monday', 'Wednesday', 'Friday'] },
      { id: 30, name: 'Dr. William', specialization: 'Dentistry - teeth care', availableDays: ['Tuesday', 'Thursday', 'Saturday'] },
      { id: 31, name: 'Dr. Charlotte', specialization: 'General Practice - full body care and treatment', availableDays: ['Monday', 'Tuesday', 'Thursday'] },
      { id: 32, name: 'Dr. Benjamin', specialization: 'Ophthalmology - eye care', availableDays: ['Monday', 'Thursday', 'Friday'] },
      { id: 33, name: 'Dr. Amelia', specialization: 'Oncology - cancer treatment', availableDays: ['Tuesday', 'Wednesday', 'Friday'] },
      { id: 34, name: 'Dr. Lucas', specialization: 'Gynecology - women\'s health', availableDays: ['Monday', 'Thursday'] },
      { id: 35, name: 'Dr. Harper', specialization: 'Pulmonology - lung care', availableDays: ['Tuesday', 'Wednesday', 'Friday'] },
      { id: 36, name: 'Dr. Evelyn', specialization: 'Rheumatology - joint and autoimmune disorders', availableDays: ['Monday', 'Thursday', 'Saturday'] },
      { id: 37, name: 'Dr. Mason', specialization: 'Nephrology - kidney care', availableDays: ['Tuesday', 'Wednesday', 'Friday'] },
      { id: 38, name: 'Dr. Abigail', specialization: 'Allergy and Immunology - allergy treatment', availableDays: ['Monday', 'Thursday'] }
      // ... (other physicians)
    ];
  
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    // State
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let selectedPhysician = null;
    let selectedDate = null;
    let bookedAppointments = {}; // Store booked appointments
  
    // Components
    const SpecializationSelect = () => {
      const specializations = [...new Set(physicians.map(p => p.specialization))];
      return `
        <select id="specializationSelect" class="w-full p-2 border rounded">
          <option value="">Select a specialization</option>
          ${specializations.map(s => `<option value="${s}">${s}</option>`).join('')}
        </select>
      `;
    };
  
    const PhysicianSelect = (specialization) => {
      const filteredPhysicians = physicians.filter(p => p.specialization === specialization);
      return `
        <select id="physicianSelect" class="w-full p-2 border rounded">
          <option value="">Select a physician</option>
          ${filteredPhysicians.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
        </select>
      `;
    };
  
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
        const formattedDate = formatDate(date);
        const isAvailable = physician.availableDays.includes(dayName) && !isDateBooked(physician.id, formattedDate);
        const cellClass = isAvailable
          ? 'bg-green-100 hover:bg-green-200 cursor-pointer'
          : 'bg-gray-100 text-gray-400 cursor-not-allowed';
  
        calendarHTML += `
          <div class="${cellClass} text-center py-2 text-sm" data-date="${formattedDate}" ${isAvailable ? '' : 'disabled'}>
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
      <div class="space-y-4 max-w-md mx-auto">
        <h2 class="text-xl font-semibold">Choose a Physician Basesd on Your Symptoms</h2>
        ${SpecializationSelect()}
        <h2 class="text-xl font-semibold">Select a Physician</h2>
        <div id="physicianSelectContainer"></div>
        <h2 class="text-xl font-semibold">Select a Date</h2>
        <div id="calendar"></div>
        <h2 class="text-xl font-semibold">Select a Time</h2>
        <input type="time" id="timeInput" class="p-2 border rounded" required>
        <br>
        <br>
        <button id="bookAppointment" class="w-[300px] flex justify-center items-center m-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">Schedule an Appointment</button>
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
            <button id="downloadReceipt" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex gap-2"><img src="images/icons/download.png" alt="Download" class="w-6 h-6">Download Receipt</button>
          </div>
          <button id="closeModal" class="mt-4 w-full bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors">Close</button>
        </div>
      </div>
    `;
  
    // Event handlers
    const handleSpecializationChange = (e) => {
      const specialization = e.target.value;
      $('#physicianSelectContainer').innerHTML = PhysicianSelect(specialization);
      $('#physicianSelect').addEventListener('change', handlePhysicianChange);
      selectedPhysician = null;
      selectedDate = null;
      updateCalendar();
    };
  
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
      
      if (!selectedPhysician || !selectedDate || !time) {
        alert('Please select a physician, date, and time for your appointment.');
        return;
      }
      
      if (isDateBooked(selectedPhysician.id, selectedDate)) {
        alert('This physician already has an appointment on this date. Please select a different date.');
        return;
      }
      
      // Book the appointment
      bookAppointment(selectedPhysician.id, selectedDate, time);
      
      const message = `Appointment booked with ${selectedPhysician.name} on ${selectedDate} at ${time}.`;
      $('#app').insertAdjacentHTML('beforeend', ReceiptModal(selectedPhysician, selectedDate, time, message));
      setupModalHandlers();
      
      // Clear the form after successful booking
      resetForm();
    };
  
    // New function to reset the form
    const resetForm = () => {
      $('#specializationSelect').value = '';
      $('#physicianSelectContainer').innerHTML = '';
      $('#calendar').innerHTML = '<p>Please select a physician to view available dates.</p>';
      $('#timeInput').value = '';
      selectedPhysician = null;
      selectedDate = null;
      updateCalendar();
    };
  
    // Modify setupModalHandlers to include form reset when closing the modal
    const setupModalHandlers = () => {
      $('#closeModal').addEventListener('click', () => {
        $('#receiptModal').remove();
        resetForm();
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
      if (selectedPhysician) {
        $('#calendar').innerHTML = Calendar(selectedPhysician, currentYear, currentMonth);
        setupCalendarNavigation();
      } else {
        $('#calendar').innerHTML = '<p>Please select a physician to view available dates.</p>';
      }
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
  
    // Helper functions for appointment booking
    const isDateBooked = (physicianId, date) => {
      return bookedAppointments[physicianId] && bookedAppointments[physicianId][date];
    };
  
    const bookAppointment = (physicianId, date, time) => {
      if (!bookedAppointments[physicianId]) {
        bookedAppointments[physicianId] = {};
      }
      bookedAppointments[physicianId][date] = time;
    };
  
    // Initialization
    const init = () => {
      $('#app').innerHTML = `
        <div class="flex flex-col md:flex-row min-h-screen">
          <div class="w-full md:w-1/2 p-4 md:p-8 overflow-y-auto">
            <h1 class="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-800">Physician Appointment Scheduling</h1>
            <div id="appointmentForm"></div>
          </div>
          <div class="w-full md:w-1/2"></div>
        </div>
      `;
      $('#appointmentForm').innerHTML = AppointmentForm();
      $('#specializationSelect').addEventListener('change', handleSpecializationChange);
      $('#calendar').addEventListener('click', handleDateSelection);
      $('#bookAppointment').addEventListener('click', handleAppointmentSubmit);
    };
  
    // Start the application
    init();
  })();