<template>
  <div class="flex items-center justify-center">
    <div class="w-full">
      <div class="md:px-1 py-4 pl-4 md:py-7 bg-white rounded-tl-lg rounded-tr-lg">
        <div class="sm:flex items-center justify-start">
          <div>
            <button @click="getAllEmployees"
  class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3  bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
  <p class="text-sm font-medium leading-none text-white text-center">Get All Employees</p>
</button>
          </div>
          <div>
            <router-link to="/employee/add">
              <button
                class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 pl-4 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                <p class="text-sm font-medium leading-none text-white">Add Employee</p>
              </button>
            </router-link>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-3">
            <input v-model="searchQuery" @input="searchEmployees" type="text" placeholder="Search employees"
              class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600">
          </div>
          
        </div>
      </div>

      <!-- Responsive table -->
      <div class="bg-white shadow px-4 pb-5 overflow-x-auto">
        <table class="w-full table-auto border border-gray-200">
          <thead>
            <tr class="w-full text-sm leading-none text-gray-800 border-b border-gray-200 whitespace-nowrap">
              <th class="font-normal py-2 text-center border-r border-gray-200">No</th>
              <th class="font-normal py-4 px-4 text-left border-r border-gray-200 hidden md:table-cell">Employee ID</th>
              <th class="font-normal py-4 text-left px-4 border-r border-gray-200">Employee Name</th>
              <th class="font-normal py-4 text-left px-4 border-r border-gray-200">Gender</th>
              <th class="font-normal text-left px-4 border-r border-gray-200">Phone Number</th>
              <th class="font-normal text-left px-4 border-r border-gray-200">Email</th>
              <th class="font-normal text-left px-4 border-r border-gray-200 hidden lg:table-cell">Department</th>
              <th class="font-normal text-left px-4 border-r border-gray-200 hidden lg:table-cell">Section</th>
              <th class="font-normal text-left px-4 border-r border-gray-200 hidden xl:table-cell">Site</th>
              <th class="font-normal text-left px-4 border-r border-gray-200 hidden xl:table-cell">Email Approver 1</th>
              <th class="font-normal text-left px-4 border-r border-gray-200 hidden xl:table-cell">Email Approver 2</th>
              <th class="font-normal text-left px-4 border-r border-gray-200 hidden xl:table-cell">Email Approver 3</th>
              <th class="font-normal text-left px-4 border-r border-gray-200 hidden 2xl:table-cell">Email Acknowledge</th>
              <th class="font-normal text-left px-4 border-r border-gray-200">Back Date</th>
              <th class="font-normal text-left px-4 border-r border-gray-200">Status</th>
              <th class="font-normal border-r border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in paginatedEmployees" :key="employee.employeeid"
              class="text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-gray-200">
              <td class="px-4 py-4 flex items-center text-left border-r border-gray-200">{{ (currentPage - 1) * pageSize
                + index + 1 }}</td>
              <td class="px-4 border-r text-left border-gray-200 whitespace-nowrap hidden md:table-cell">{{
                employee.employeeid }}</td>
              <td class="pl-4 border-r border-gray-200 whitespace-nowrap px-4">{{ employee.employeename }}</td>
              <td class="pl-4 border-r border-gray-200 whitespace-nowrap px-4">{{ employee.gender }}</td>
              <td class="pl-4 border-r text-center border-gray-200 whitespace-nowrap px-4">{{
                formatPhone(employee.phone) }}</td>
              <td class="pl-4 border-r border-gray-200 whitespace-nowrap px-4">
              <span v-if="employee.email === '0'" class="text-red-600">No email</span>
              <span v-else class="text-blue-600">{{ employee.email }}</span>
              </td>
              <td class="pl-4 border-r border-gray-200 whitespace-nowrap px-4 hidden lg:table-cell">{{
                employee.department }}</td>
              <td class="pl-4 border-r border-gray-200 whitespace-nowrap px-4 hidden lg:table-cell">{{ employee.section
                }}</td>
              <td class="pl-4 border-r border-gray-200 whitespace-nowrap px-4 hidden xl:table-cell">{{ employee.site }}
              </td>
              <td
                class="pl-4 border-r border-gray-200 text-blue-600 underline whitespace-nowrap px-4 hidden xl:table-cell">
                {{ employee.emailapproverl1 }}</td>
              <td
                class="pl-4 border-r border-gray-200 text-blue-600 underline whitespace-nowrap px-4 hidden xl:table-cell">
                {{ employee.emailapproverl2 }}</td>
              <td
                class="pl-4 border-r border-gray-200 text-blue-600 underline whitespace-nowrap px-4 hidden xl:table-cell">
                {{ employee.emailapproverl3 }}</td>
              <td
                class="pl-4 border-r border-gray-200 text-blue-600 underline whitespace-nowrap px-4 hidden 2xl:table-cell">
                {{ employee.acknowledgeby }}</td>
 
              <td class="pl-4 border-r text-center border-gray-200 whitespace-nowrap px-4">{{ employee.allowdate }}</td>
              <td class="pl-4 border-r border-gray-200 whitespace-nowrap px-4">
                <span v-if="employee.status === 'inactive'" class="text-red-600">Inactive</span>
                <span v-else class="text-green-600">{{ employee.status }}</span>
              </td>
              <td class="border-r px-4 text-center relative whitespace-nowrap">
                <button @click="toggleDropdown(index)" class="f'top-auto bottom-8' : 'top-8' ocus:ring-2 rounded-md focus:outline-none" role="button"
                  aria-label="options">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>
                <div v-if="show === index" class="dropdown-content bg-white shadow w-24 absolute z-20 right-0 top-8">
                  <div
                    class="focus:outline-none text-md focus:text-indigo-600 w-full hover:bg-indigo-700 py-3 px-4 cursor-pointer hover:text-white"
                    @click="viewEmployee(employee)">
                    <p>View</p>
                  </div>
                  <div
                    class="focus:outline-none text-md focus:text-indigo-600 w-full hover:bg-indigo-700 py-3 px-4 cursor-pointer hover:text-white"
                    @click="editEmployee(employee)">
                    <p>Edit</p>
                  </div>
                
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination controls -->
      <div class="flex items-center justify-between mt-6">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          <span>Previous</span>
        </button>

        <div class="items-center hidden md:flex gap-x-3">
          <span v-for="page in visiblePages" :key="page" @click="goToPage(page)"
            :class="{ 'bg-blue-100/60 text-blue-500': page === currentPage, 'hover:bg-gray-100 text-gray-500': page !== currentPage }"
            class="px-2 py-1 text-sm rounded-md cursor-pointer">{{ page }}</span>
        </div>

        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
          <span>Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import { emptyProps, useLoadingBar } from 'naive-ui';// Loaing bar
import axios from 'axios';

const employees = ref([]);
const filteredEmployees = ref([]);
const currentPage = ref(1);
const pageSize = 10;
const searchQuery = ref('');
const show = ref(null);

// Initialize router
const router = useRouter();
filteredEmployees.value = employees.value;
// Method to format phone number
function formatPhone(phone) {
  if (phone.startsWith('+855')) {
    // Replace +855 with 0 for local phone numbers
    return '0' + phone.slice(4);
  }
  return phone;
}

// Toggle dropdown for each row
function toggleDropdown(index) {
  console.log('Toggling dropdown for index:', index);
  show.value = show.value === index ? null : index;
}

// Edit employee function
function editEmployee(employee) {
  console.log('Editing employee:', employee);
  router.push({ name: 'edit-Employee', params: { id: employee.employeeid } });
}

// View employee function
function viewEmployee(employee) {
  console.log('Viewing employee:', employee);
  router.push({ name: 'view-Employee', params: { id: employee.employeeid } });
}

// Delete employee function
function deleteEmployee(employee) {
  console.log('Deleting employee:', employee);
  alert(`Deleting employee: ${employee.employeename}`);
}
const loadingBar = useLoadingBar();
// Fetch all employees from the API
async function getAllEmployees() {
  loadingBar.start();
  try {
    const response = await axios.post(
      'https://prod-18.southeastasia.logic.azure.com:443/workflows/c353c70b1bfd47c0b60d11abce5387ad/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yrYf_rYcWBkxcq9O_2ZEkNKCAA-BC0q-QVoUFwf2Xl8',
      {
        RequestType: 'GetEmployeeslist',
        Employeestatus: 'active',
      }
    );

    if (response.data && response.data.data) {
      const fixedString = response.data.data
        .replace(/''\+/g, "'+")
        .replace(/'/g, '"');
      
      const employeeData = JSON.parse(fixedString);
      const employeesList = employeeData.EmployeesList || [];
      employees.value = employeesList;
      filteredEmployees.value = employeesList; 
      // Store data in local storage
      localStorage.setItem('employees', JSON.stringify(employeesList));
      console.log('Stored employees data in local storage:', employeesList);
    } else {
      console.error('Error: response.data.data is undefined');
    }
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }finally {
    loadingBar.finish();
  }
}

// Load employees from local storage on page load
onMounted(() => {
  const storedEmployees = localStorage.getItem('employees');
  if (storedEmployees) {
    employees.value = JSON.parse(storedEmployees);
    filteredEmployees.value = employees.value; // Initialize filtered employees
  }
});
// New search function
function searchEmployees() {
  const query = searchQuery.value.toLowerCase();
  filteredEmployees.value = employees.value.filter(employee => {
    return (
      employee.employeename.toLowerCase().includes(query) ||
      employee.employeeid.toString().includes(query) || 
      employee.phone.toString().includes(query)||
      employee.email.toString().includes(query) // You can add more fields to search
    );
  });
}

// Computed property to get paginated employees
const paginatedEmployees = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredEmployees.value.slice(start, end);
});

// Total number of pages
const totalPages = computed(() => {
  return Math.ceil(filteredEmployees.value.length / pageSize);
});

// Computed property for visible pages with gaps
const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const maxVisiblePages = 5;
  const range = [];

  if (total <= maxVisiblePages) {
    for (let i = 1; i <= total; i++) {
      range.push(i);
    }
  } else {
    range.push(1, 2, 3);

    if (current > 3 && current < total - 2) {
      if (current - 1 > 3) range.push('...');
      range.push(current - 1, current, current + 1);
      if (current + 1 < total - 2) range.push('...');
    }

    range.push(total - 2, total - 1, total);
  }

  return range;
});

// Pagination functions
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function goToPage(page) {
  if (page !== '...') currentPage.value = page;
}

</script>

<style scoped>
.dropdown-content {
  transition: all 0.3s ease;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.overflow-x-auto {
  overflow-x: auto;
}

</style>
