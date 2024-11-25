<template>
    <div class="bg-white">
        <section class="w-full overflow-hidden dark:bg-gray-900">
            <div v-if="employee" class="flex flex-col">
                <!-- Profile Image -->
                <div class="w-full mx-auto flex flex-col items-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User Profile"
                        class="rounded-md my-5 w-[40%] sm:w-[30%] md:w-[20%] lg:w-[10rem] lg:h-[10rem]" />

                    <!-- FullName -->
                    <h1
                       class="text-center my-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
                        {{ employee.employeename || 'Not available' }}</h1>
                        <div class="flex justify-center mb-4">
                        <router-link :to="{ name: 'edit-Employee', params: { id: employee.employeeid } }">
                            <button class="flex px-4 py-2 bg-red-600 text-white text-lg font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <i class="fa-solid fa-pen text-md"></i>
                            </button>
                        </router-link>
                    </div>
                </div>

  <div class="w-full max-w-screen-md mx-auto flex flex-col gap-4 items-center p-4">
    <!-- Detail -->
    <div class="w-full my-auto py-6  pl-4 flex flex-col justify-center gap-2">
        <div class="w-full flex flex-col gap-2 justify-center sm:flex-row">
            <div class="flex-1">
                <div class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div class="flex flex-col pb-3">
                        <p class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Employee ID</p>
                        <p class="text-lg font-semibold">{{ employee.employeeid || 'Not available' }}</p>
                    </div>
                    <div class="flex flex-col pb-3">
                        <p class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Gender</p>
                        <p class="text-lg font-semibold">{{ employee.gender || 'Not available' }}</p>
                    </div>
                    <div class="flex flex-col pb-3">
                        <p class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Department</p>
                        <p class="text-lg font-semibold">{{ employee.department || 'Not available' }}</p>
                    </div>
                    <div class="flex flex-col pb-3">
                        <p class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</p>
                        <p class="text-lg font-semibold">{{ employee.email || 'Not available' }}</p>
                    </div>
                    <div class="flex flex-col pt-3">
                        <p class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Approver Email 2</p>
                        <p class="text-lg font-semibold hover:text-blue-500">{{ employee.emailapproverl2 || 'Not available' }}</p>
                    </div>
                    <div class="flex flex-col pt-3">
                        <p class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Approver Email 3</p>
                        <p class="text-lg font-semibold hover:text-blue-500">{{ employee.emailapproverl3 || 'Not available' }}</p>
                    </div>
                    <div class="flex flex-col pt-3">
                        <p class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Status</p>
                        <p :class="{ 'text-green-500': employee.status === 'Active', 'text-red-500': employee.status === 'Inactive' }" class="text-lg font-semibold">
                            {{ employee.status || 'Not available' }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex-1">
                <div class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div class="flex flex-col pb-3 ">
                        <p class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Full Name</p>
                        <p class="text-lg font-semibold">{{ employee.employeename || 'Not available' }}</p>
                    </div>
                    <div class="flex flex-col pt-3">
                        <p class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</p>
                        <p class="text-lg font-semibold">{{ employee.phone || 'Not available' }}</p>
                    </div>
                    <div class="flex flex-col pt-3">
                        <p class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Position</p>
                        <p class="text-lg font-semibold">{{ employee.section || 'Not available' }}</p>
                    </div>
                    <div class="flex flex-col pt-3">
                        <p class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Approver Email 1</p>
                        <p class="text-lg hover:text-blue-500 font-semibold">{{ employee.emailapproverl1 || 'Not available' }}</p>
                    </div>
                    <div class="flex flex-col pt-3">
                        <p class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Acknowledge Email</p>
                        <p class="text-lg font-semibold">{{ employee.acknowledgeby || 'Not available' }}</p>
                    </div>
                    <div class="flex flex-col pt-3">
                        <p class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Allow Date</p>
                        <p class="text-lg font-semibold hover:text-blue-500">{{ employee.allowdate || 'Not available' }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
            <div v-else class="text-center text-gray-500 dark:text-gray-400">
                Employee data not found.
            </div>
        </section>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const employee = ref(null);

// Get the employee ID from the URL
const route = useRoute();
const employeeId = route.params.id;

onMounted(() => {
    // Retrieve employees from localStorage
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));

    if (storedEmployees && Array.isArray(storedEmployees)) {
        // Find the employee by ID
        const foundEmployee = storedEmployees.find(emp => emp.employeeid === employeeId);

        if (foundEmployee) {
            employee.value = foundEmployee; // Set the employee data to display
        } else {
            console.error('Employee not found in localStorage');
        }
    } else {
        console.error('No employee data in localStorage');
    }
});
</script>

<style scoped>
.grid div {
    margin-bottom: 1rem;
}
</style>
