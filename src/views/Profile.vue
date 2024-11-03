<template>
    <div class="bg-white">
        <section class="w-full overflow-hidden dark:bg-gray-900 p-4 sm:p-8">
            <div v-if="loading" class="flex items-center justify-center py-4">
                <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span class="ml-2">Loading employee data...</span>
            </div>

            <div v-if="error" class="text-red-600 mt-4">{{ error }}</div>

            <div v-if="!loading && !error" class="flex flex-col items-center">
                <!-- Profile Image -->
                <div class="w-full sm:w-[80%] xs:w-[90%] mx-auto flex flex-col items-center sm:flex-row">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User Profile"
                         class="rounded-md w-[8rem] h-[8rem] sm:w-[10rem] sm:h-[10rem] lg:w-[12rem] lg:h-[12rem] my-5 mx-auto sm:mx-0" />
                    
                    <!-- Full Name -->
                    <h1 class="w-full text-center sm:text-left mt-4 sm:mt-0 sm:ml-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl font-serif">
                         {{ employeeData?.EmployeeName || 'Not available' }}
                    </h1>
                    <div class="flex justify-start">  
                        <button @click="editEmployee(employeeData?.EmployeeID)" class="flex items-center px-4 py-2 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232a4.5 4.5 0 10-6.364 6.364L4.5 18l3 3 4.368-4.368a4.5 4.5 0 006.364-6.364l-3.5-3.5z" />
                            </svg>
                            <span class="ml-2">Edit</span>
                        </button>
                    </div>
                </div>
                <div class="w-full sm:w-[80%] lg:w-[70%] mx-auto flex flex-col gap-4 items-center mt-4">
                    <!-- Detail -->
                    <div class="w-full my-auto py-6 flex flex-col justify-center gap-4">
                        <div class="w-full flex flex-col sm:flex-row gap-4">
                            <div class="w-full">
                                <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                    <div class="flex flex-col pb-3">
                                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Employee ID</dt>
                                        <dd class="text-lg font-semibold">{{ employeeData?.EmployeeID }}</dd>
                                    </div>
                                    <div class="flex flex-col py-3">
                                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">First Name</dt>
                                        <dd class="text-lg font-semibold">{{ employeeData?.EmployeeName.split(' ')[1] }}</dd>
                                    </div>
                                    <div class="flex flex-col py-3">
                                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Name</dt>
                                        <dd class="text-lg font-semibold">{{ employeeData?.EmployeeName.split(' ')[0] }}</dd>
                                    </div>
                                    <div class="flex flex-col py-3">
                                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Site</dt>
                                        <dd class="text-lg font-semibold">{{ employeeData?.Site }}</dd>
                                    </div>
                                </dl>
                            </div>
                            <div class="w-full">
                                <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                    <div class="flex flex-col pb-3">
                                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Department</dt>
                                        <dd class="text-lg font-semibold">{{ employeeData?.Department }}</dd>
                                    </div>
                                    <div class="flex flex-col pt-3 pb-3">
                                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
                                        <dd class="text-lg font-semibold">{{ employeeData?.Phone || 'N/A' }}</dd>
                                    </div>
                                    <div class="flex flex-col pt-3 pb-3">
                                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                                        <dd class="text-lg font-semibold">{{ employeeData?.Email || 'Email not provided' }}</dd>
                                    </div>
                                    <div class="flex flex-col pt-3 pb-3">
                                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Status</dt>
                                        <dd class="text-lg font-semibold">{{ employeeData?.Status }}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface EmployeeData {
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

const router = useRouter();
const employeeData = ref<EmployeeData | null>(null);
const loading = ref(true);
const error = ref<string | null>(null); // Add an error state

onMounted(async () => {
    try {
        const storedData = localStorage.getItem('employeeData');
        if (storedData) {
            employeeData.value = JSON.parse(storedData);
        } else {
            error.value = 'No employee data found in local storage';
        }
    } catch (e) {
        error.value = 'Failed to load employee data';
        console.error(e);
    } finally {
        loading.value = false;
    }
});

function editEmployee(employeeID: string | undefined) {
    if (employeeID) {
        router.push({ name: 'edit-Employee', params: { id: employeeID } });
    } else {
        error.value = 'No Employee ID provided';
    }
}
</script>

<style scoped>
/* Additional styles, if needed */
</style>
