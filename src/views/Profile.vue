<template>
    <div class="bg-white rounded-md shadow h-full">
        <section class="w-full overflow-hidden dark:bg-gray-900">
            <div v-if="employeeData" class="flex flex-col">
                <!-- Two Column Layout -->
                <div class="flex flex-col md:flex-row items-start gap-8 w-full mx-auto py-6">
                    <!-- Left Column: Profile Image and Name -->
                    <div class="flex-none items-center justify-center w-full md:w-[25%]">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                            alt="User Profile"
                            class="rounded-md w-[40%] md:w-[30%] sm:w-[50%] xs:w-[70%] lg:w-[12rem] lg:h-[12rem] mx-auto" 
                        />
                        <h1 
                            class="text-center text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif mt-4">
                            {{ employeeData.EmployeeName || 'Not available' }}
                        </h1>
                        <div class="flex justify-center mb-4">
                            <router-link :to="{ name: 'edit-Employee', params: { id: employeeData.EmployeeID } }">
                                <button 
                                    aria-label="Edit Employee"
                                    class="flex px-4 py-2 bg-red-600 text-white text-lg font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <i class="fa-solid fa-pen text-md"></i> Edit
                                </button>
                            </router-link>
                        </div>
                    </div>
                    
                    <!-- Right Column: Employee Details -->
                    <div class="flex-1 ml-4 text-lg">
                        <div class="mt-4 text-lg">
                            <div class="flex flex-col gap-2 text-lg">
                                <div class="flex justify-start">
                                    <p class="text-gray-500">Employee ID</p>
                                    <p class="font-semibold ml-2">{{ employeeData.EmployeeID || 'Not available' }}</p>
                                </div>
                                <div class="flex justify-start">
                                    <p class="text-gray-500">Gender</p>
                                    <p class="font-semibold ml-2">{{ employeeData.gender || 'Not available' }}</p>
                                </div>
                                <div class="flex justify-start">
                                    <p class="text-gray-500">Department</p>
                                    <p class="font-semibold ml-2">{{ employeeData.Department || 'Not available' }}</p>
                                </div>
                                <div class="flex justify-start">
                                    <p class="text-gray-500">Email</p>
                                    <p class="font-semibold ml-2">{{ employeeData.Email || 'Not available' }}</p>
                                </div>
                                <div class="flex justify-start" v-show="false">
                                    <p class="text-gray-500">Annual Leave Balance</p>
                                    <p class="font-semibold ml-2">{{employeeData.albalance || 'Not available' }}/{{employeeData.annualleave || 'Not available' }} days</p>
                                </div>
                                <div class="flex justify-start" v-show="false">
                                    <p class="text-gray-500">Sick Leave Balance</p>
                                    <p class="font-semibold ml-2">{{ employeeData.slbalance || 'Not available' }}/{{ employeeData.sickleave || 'Not available' }} days</p>
                                </div>
                                <div class="flex justify-start">
                                    <p class="text-gray-500">Status</p>
                                    <p 
                                        :class="statusClass"
                                        class="font-semibold">
                                        {{ employeeData.Status || 'Not available' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error or Loading State -->
            <div v-else class="text-center text-gray-500 dark:text-gray-400">
                <p v-if="loading">Loading...</p>
                <p v-if="error">{{ error }}</p>
                <p v-if="!loading && !error">Employee data not found.</p>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

interface EmployeeData {
    EmployeeID: string;
    EmployeeName: string;
    Email: string;
    Site: string;
    Department: string;
    Section: string;
    Status: string;
    gender: string;
    Phone: string;
    role: string;
    annualleave:string;
    sickleave:string;
    albalance:string;
    slbalance:string;
}
const router = useRouter();
const employeeData = ref<EmployeeData | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const statusClass = computed(() => {
    if (employeeData.value?.Status === 'Active') return 'text-green-500 ml-2';
    if (employeeData.value?.Status === 'Inactive') return 'text-red-500';
    return '';
});
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
