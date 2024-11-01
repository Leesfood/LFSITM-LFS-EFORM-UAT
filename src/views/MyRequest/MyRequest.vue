<template>
  <div class="flex items-center justify-center">
    <div class="w-full">
      <!-- New Boxes Section -->
      <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-4">
    <div class="bg-gradient-to-r from-green-400 to-green-300 p-6 rounded-lg shadow-lg w-full transition-transform transform hover:scale-105">
        <h3 class="text-2xl font-bold text-blue-900 text-center">Leave Balances:</h3>
        <p class="text-lg text-gray-700 mt-2 text-left">Annual Leave (AL): 0 days</p>
        <p class="text-lg text-gray-700 text-left">Sick Leave (SL): 0 days</p>
        <p class="text-lg text-gray-700 text-left">Special Leave (SPL): 0 days</p>
        <p class="text-lg text-gray-700 text-left">Maternity Leave (ML): 0 days</p>
    </div>
    <div class="bg-gradient-to-r from-yellow-300 to-yellow-200 p-6 rounded-lg shadow-lg w-full text-center transition-transform transform hover:scale-105">
        <h3 class="text-2xl font-bold text-green-900">Pending Approvals:</h3>
        <p class="text-lg text-gray-700 mt-2">Requests: 0</p>
    </div>
    <div class="bg-gradient-to-r from-red-300 to-red-200 p-6 rounded-lg shadow-lg w-full text-center transition-transform transform hover:scale-105">
        <h3 class="text-2xl font-bold text-yellow-900">Your Approvals:</h3>
        <p class="text-lg text-gray-700 mt-2">Requests: 0</p>
    </div>
</div>


      <!-- Get MyRequest -->
      <div class="md:px-1 py-4 pl-4 md:py-7 bg-white rounded-tl-lg rounded-tr-lg">
          <div class="sm:flex items-center justify-start">
              <button @click="getMyrequest"
                      class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex sm:ml-3 mt-4 sm:mt-0 items-center justify-center px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded transition duration-200">
                  <i class="fas fa-tasks mr-2"></i> <!-- Tasks icon -->
                  <p class="text-sm font-medium leading-none text-white">Get My Requests</p>
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
                <th class="font-normal py-4 text-left px-4 border-r border-gray-300">From Date</th>
                <th class="font-normal py-4 text-left px-4 border-r border-gray-300">To Date</th>
                <th class="font-normal text-left px-4 border-r border-gray-300">Reason for leave</th>
                <th class="font-normal text-left px-4 border-r border-gray-300">Status</th>
                <th class="font-normal border-r border-gray-200">Action</th>
            </tr>
        </thead>
        <tbody>
            <!-- Display message if list is empty -->
            <tr v-if="myrequest.length === 0">
                <td colspan="7" class="text-center text-gray-500 py-4">No requests found.</td>
            </tr>
            <!-- Loop through myrequest data -->
            <tr v-for="(requestlist, index) in myrequest" :key="index" class="text-sm leading-none text-gray-800 border-b border-gray-200 whitespace-nowrap">
                <td class="text-center border-r border-gray-200 py-2">{{ index + 1 }}</td>
                <td class="px-4 py-4 text-left border-r border-gray-200 hidden md:table-cell">{{ requestlist.RequestType }}</td>
                <td class="px-4 py-4 text-left border-r border-gray-200">{{ requestlist.FromDate }}</td>
                <td class="px-4 py-4 text-left border-r border-gray-200">{{ requestlist.ToDate }}</td>
                <td class="px-4 py-4 text-left border-r border-gray-200">{{ requestlist.LeaveReason }}</td>
                <td class="px-4 py-4 text-left border-r border-gray-200">{{ requestlist.Status }}</td>
                <td class="text-center border-r border-gray-200">
                    <!-- Enhanced Action Buttons with Icons -->
                    <div class="flex justify-center">
                        <button @click="handleAction(requestlist, 'view')" class="flex items-center bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-600 transition duration-200">
                            <i class="fas fa-eye mr-1"></i> <!-- Eye icon for View -->
                            View
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { format, subDays } from "date-fns";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLoadingBar } from 'naive-ui';

// Define interface for the request items
interface RequestData {
  RequestType: string;
  FromDate: string;
  ToDate: string;
  LeaveReason: string;
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
    balanceal: string;
    Phone: string;
    role: string;
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
        .replace(/'/g, '"')
        .replace(/\s+/g, ''); // Remove extra whitespace if needed
      console.log("Fixed String before JSON parse:", fixedString);  // Debugging line
      try {
        const parsedData = JSON.parse(fixedString);
        myrequest.value = parsedData.MyRequestList || [];
        
        console.log('Parsed myrequest data:', myrequest.value);
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
  const actionMessage = action === 'view' ? 'viewing' : 'cancelling';
  Swal.fire('Action', `You are ${actionMessage} the request: ${request.RequestType}`, 'info');
}


    
 </script>

<style>
.battambang-regular {
  font-family: "Battambang", system-ui;
  font-weight: 400;
  font-style: normal;
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
