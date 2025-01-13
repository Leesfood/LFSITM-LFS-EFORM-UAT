<template>
  <div class="flex items-center justify-center">
    <div class="w-full">
      <!-- New Boxes Section -->
      <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-4">
    <!-- <div class="bg-gradient-to-r from-green-400 to-green-300 p-6 rounded-lg shadow-lg w-full transition-transform transform hover:scale-105">
        <h3 class="text-2xl font-bold text-blue-900 text-center">Leave Balances:</h3>
        <p class="text-lg text-gray-700 mt-2 text-left">Annual Leave (AL): {{ employeeProfileData?.albalance}}/{{ employeeProfileData?.annualleave }} days</p> 
        <p class="text-lg text-gray-700 text-left">Sick Leave (SL): {{ employeeProfileData?.slbalance}}/{{ employeeProfileData?.sickleave }} days</p> 
        <p class="text-lg text-gray-700 text-left">Special Leave (SPL): 0 days</p>
        <p class="text-lg text-gray-700 text-left">Maternity Leave (ML): 0 days</p>
    </div> -->
    <div class="bg-gradient-to-r from-yellow-300 to-yellow-200 p-6 rounded-lg shadow-lg w-full text-center transition-transform transform hover:scale-105">
        <h3 class="text-2xl font-bold text-green-900">Your Requested:</h3>
        <p class="text-lg text-gray-700 mt-2 text-left">Pending : {{ pendingCount }} Requests</p>
        <p class="text-lg text-gray-700 mt-2 text-left">Rejected : {{ rejectedgCount }} Requests</p>
        <p class="text-lg text-gray-700 mt-2 text-left">Approved : {{ approvedgCount }} Requests</p>
    </div>
    <div class="bg-gradient-to-r from-red-300 to-red-200 p-6 rounded-lg shadow-lg w-full text-center transition-transform transform hover:scale-105">
        <h3 class="text-2xl font-bold text-yellow-900">Waiting Your Approvals:</h3>
        <p class="text-lg text-gray-700 mt-2">Requests: 0</p>
    </div>
</div>


      <!-- Get MyRequest -->
      <div class="md:px-1 py-4 pl-4 md:py-7 bg-white rounded-tl-lg rounded-tr-lg">
          <div class="sm:flex items-center justify-start">
              <button @click="getMyrequest"
                      class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex sm:ml-3 mt-4 sm:mt-0 items-center justify-center px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded transition duration-200">
                  <i class="fas fa-refresh mr-2 text-white"></i> <!-- Tasks icon -->
                  <p class="text-sm font-medium leading-none text-white">Refresh</p>
              </button>
          </div>
      </div>
      
      <!-- Responsive table -->
      <div class="bg-white shadow px-4 pb-5 overflow-x-auto">
    <table class="w-full table-auto border border-gray-200">
        <thead>
            <tr class="w-full text-sm leading-none text-blue bg-gray-200 border-b border-gray-200 whitespace-nowrap">
                <th class="font-normal py-2 text-center border-r border-gray-300">No</th>
                <th class="font-normal py-4 px-4 text-left border-r border-gray-300 hidden md:table-cell">Request Type</th>
                <th class="font-normal py-4 text-left px-4 border-r border-gray-300">#Requested</th>
                <th class="font-normal py-4 text-left px-4 border-r border-gray-300">From Date</th>
                <th class="font-normal py-4 text-left px-4 border-r border-gray-300">To Date</th>
                <th class="font-normal text-left px-4 border-r border-gray-300">Reason for leave</th>
                <th class="font-normal text-left px-4 border-r border-gray-300">Status</th>
            </tr>
        </thead>
        <tbody>
            <!-- Display message if list is empty -->
            <tr v-if="myrequest.length === 0">
                <td colspan="7" class="text-center text-gray-500 py-4">No requests found.</td>
            </tr>
            <!-- Loop through myrequest data -->
            <tr v-for="(requestlist, index) in paginatedMyrequestlist" :key="index" :class="['text-sm leading-none border-b border-gray-200 whitespace-nowrap']">
                <td class="text-center border-r border-gray-200 py-2">{{ index + 1 }}</td>
                <td class="px-4 py-2 text-left border-r border-gray-200 hidden md:table-cell">{{ requestlist.RequestType }}</td>
                <td class="font-normal py-4 text-left px-4 border-r border-gray-300">{{ requestlist.NumberOfdaysRequested }}</td>
                <td class="px-4 py-2 text-left border-r border-gray-200">{{ requestlist.FromDate }}</td>
                <td class="px-4 py-2 text-left border-r border-gray-200">{{ requestlist.ToDate }}</td>
                <td class="px-4 py-2 text-left border-r border-gray-200">{{ requestlist.LeaveReason}}</td>
                <td class="px-4 py-2 text-sm whitespace-nowrap">
                <div class="flex items-center gap-x-6">
                <div class="flex justify-center">
                  <button @click="handleAction(requestlist, 'view')" 
                    :class="['flex items-center  text-white font-semibold py-1 px-2 rounded hover:bg-green-600 transition duration-200',
                        requestlist.Status.includes('Approved') ? 'bg-blue-600' :
                        requestlist.Status.includes('Pending') ? 'bg-yellow-700' : 'bg-red-600']">
                    <i class="fas fa-eye mr-1"></i>{{getRowchangeStatus(requestlist.Status)}}
                    </button>
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

<script setup lang="ts">
import { ref,computed, onMounted } from 'vue';
import { format, subDays } from "date-fns";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLoadingBar } from 'naive-ui';
const showModal = ref(false);
// Define interface for the request items
interface RequestData {
  RequestType:string;
  FromDate:string;
  ToDate:string;
  NumberOfdaysRequested:string;
  DatebackTowork:string;
  Requestdate:string;
  LeaveReason:string;
  LineManagerEmail:string;
  LineManagerName:string;
  LineManagerComment:string;
  LineManagerApproveDate:string;
  LineManagerRespone:string;
  AcknowledgedBy:string;
  AcknowledgedByComment:string;
  AcknowledgedByDate:string;
  HRRespone:string;
  Status:string;
}
interface EmployeeProfileData {
    EmployeeID: string;
    EmployeeName: string;
    Email: string;
    EmailApproverL1: string;
    EmailApproverL2: string;
    EmailApproverL3: string;
    ApproverEmail: string;
    aknowledgeby: string;
    Site: string;
    Department: string;
    Section: string;
    Status: string;
    allowdate: string;
    gender: string;
    Phone: string;
    role: string;
    annualleave:string;
    sickleave:string;
    albalance:string;
    slbalance:string;
}

const employeeProfileData = ref<EmployeeProfileData | null>(null);

onMounted(() => {
    const storedProfileData = localStorage.getItem('employeeData');
    if (storedProfileData) {
      employeeProfileData.value = JSON.parse(storedProfileData);
    }
});
// Define myrequest with the RequestData type
const myrequest = ref<RequestData[]>([]); 
const currentPage = ref(1);
const pageSize = 10;
const pendingNumber=0;
const loading = ref(false);
const loadingBar = useLoadingBar();

async function getMyrequest() {
  loadingBar.start();
  try {
    const payload = {
      Title: 'Test',
      EmployeeID: employeeProfileData.value?.EmployeeID
    };
    const response = await axios.post(
      'https://prod-00.southeastasia.logic.azure.com:443/workflows/2116f7e303f842b4b1add86d3468e93c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=T03BsH1k9KKgKhDD3cK-vcSXu6Y4KSPk9pw_cGyeBNc',payload);

    if (response.data && response.data.data) {
      // Replace single quotes with double quotes and parse
      const fixedString = response.data.data
        .replace(/'/g, '"');
        //.replace(/\s+/g, ''); // Remove extra whitespace if needed
      //console.log("Fixed String before JSON parse:", fixedString);  // Debugging line
      try {
        const parsedData = JSON.parse(fixedString);
        myrequest.value = parsedData.MyRequestList || [];
        
       // console.log('Parsed myrequest data:', myrequest.value);
        localStorage.setItem('myrequest', JSON.stringify(myrequest.value));
      } catch (parseError) {
        console.error("JSON Parsing Error:", parseError);
        Swal.fire('Error', 'Failed to parse request data', 'error');
      }
    } else {
      Swal.fire('Error', 'Received empty response from the server', 'error');
    }
  } catch (error) {
    console.error('Error fetching myrequest data:', error);
    Swal.fire('Error', 'An error occurred while fetching data', 'error');
  } finally {
    loadingBar.finish();
  }
}

function handleAction(request: RequestData, action: string) {
  const requstdetail = `
		<div style="text-align: left;">
    <p class="p-custom"><span class="custom-width">ថ្ងៃស្នើសុំ/Date request:</span><span class="custom-span">${request.Requestdate}</span></p>
    <p class="p-custom"><span class="custom-width">មូលហេតុនៃការសុំ/Reason for Leave:</span><br><span class="custom-span">${request.LeaveReason}</span></p>
		<p class="p-custom"><span class="custom-width">ចំនូនដែលស្នើសុំ​ (ថ្ងៃ/ម៉ោង)/Number of request:</span><span class="custom-span">${request.NumberOfdaysRequested}</span></p>
		<p class="p-custom"><span class="custom-width">ចាប់ពីថ្ងៃ/From date:</span><span class="custom-span">${request.FromDate}</span></p>
		<p class="p-custom"><span class="custom-width">រហូតដល់ថ្ងៃ/To Date:</span><span class="custom-span">${request.ToDate}</span></p>
		<p class="p-custom"><span class="custom-width">ថ្ងៃមកធ្វើការវិញ/Back date:</span><span class="custom-span">${request.DatebackTowork}</span></p>
   <p class="p-custom"><span class="custom-width">Status :</span><span class=${getRowClassSetColor(request.Status)}>${request.Status}</span></p> 
    <p class="p-custom"><span class="custom-width"><==Line Manager==></span><span class="custom-span"></span><span class=${getRowClassSetColor(request.LineManagerRespone)}>${request.LineManagerRespone}</span></p>
    <p class="p-custom"><span class="custom-width">Name :</span><span class="text-green">${request.LineManagerName}</span>&nbsp;Date : <span class="text-green">${request.LineManagerApproveDate}</span></p>  
    <p class="p-custom"><span class="custom-width">Comment :</span><span class="text-green">${request.LineManagerComment}</span></p>  
    <p class="p-custom"><span class="custom-width"><==HR Acknowledg==></span><span class="custom-span"></span><span class=${getRowClassSetColor(request.HRRespone)}>${request.HRRespone}</span></p> 
    <p class="p-custom"><span class="custom-width">Name :</span><span class="custom-span">${request.AcknowledgedBy}</span> Date :<span class="text-green">${request.AcknowledgedByDate}</span></p> 
    <p class="p-custom"><span class="custom-width">Comment :</span><span class="text-green">${request.AcknowledgedByComment}</span></p>  
		</div>`;

  if (action === 'view') {
    // Handle view action logic here
    Swal.fire(request.RequestType, requstdetail);
  } else if (action === 'cancel') {
    // Handle cancel action logic here
    Swal.fire('Cancel Request', `You are canceling the request: ${request.RequestType}`);
  }
}
// Computed property to get paginated employees
const paginatedMyrequestlist = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return sortedMyrequestList.value.slice(start, end);
});

const sortedMyrequestList = computed(() => {
    return myrequest.value.slice().sort((a, b) => {
        if (a.Status.includes('Pending') && !b.Status.includes('Pending')) {
            return -1; // Place 'Pending' statuses first
        } else if (a.Status.includes('Rejected') && !b.Status.includes('Rejected')) {
            return 0; // Place non-'Pending' statuses after 'Pending'
        } else {
            return 1; // Keep other statuses in the same order
        }
    });
});

// Total number of pages
const totalPages = computed(() => {
  return Math.ceil(myrequest.value.length / pageSize);
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

function goToPage(page:any) {
  if (page !== '...') currentPage.value = page;
}
function getRowClassSetColor(requeststatus:string) {
  if (requeststatus.includes('Approved')) {
      return 'text-green';
    } else if (requeststatus.includes('Rejected')) {
      return 'text-red';
    } else if (requeststatus.includes('Pending')) {
      return 'text-orange-700';
    } else {
      return 'text-orange';
    }
  }
  function getRowchangeStatus(requeststatus:string) {
    if (requeststatus.includes('Approved')) {
        return 'Completed';
    } else if (requeststatus.includes('Rejected')) {
        return 'Rejected';
    } else if (requeststatus.includes('Pending')) {
        return 'Pending';
    } else {
        return 'Pending';
    }
}

const pendingCount = computed(() => {
  return myrequest.value.filter(request => request.Status.includes('Pending')).length;
});
const rejectedgCount = computed(() => {
  return myrequest.value.filter(request => request.Status.includes('Rejected')).length;
});
const approvedgCount = computed(() => {
  return myrequest.value.filter(request => request.Status.includes('Approved')).length;
});   
 </script>

<style>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
}
.text-green {
  color: green;
  
}
.text-red {
  color: red;
}
.text-orange {
  color: orange;
}
.text-default {
  color: #555;
}
.battambang-regular {
  font-family: "Battambang", system-ui;
  font-weight: 400;
  font-style: normal;
}
.dropdown-content {
  transition: all 0.3s ease;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.overflow-x-auto {
  overflow-x: auto;
}
        ::-webkit-scrollbar {
            width: 12px;
        }
        
        /* Track */
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 6px;
        }
        
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        /* Scrollbar for Firefox */
        * {
            scrollbar-width: thin;
            scrollbar-color: #888 #f1f1f1;
        }
</style>
