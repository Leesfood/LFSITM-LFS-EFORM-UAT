<template>
    <div class="rounded-md shadow dark:border bg-white dark:bg-gray-200 dark:border-gray-100 h-full">
        <form @submit.prevent="submitForm">
            <div>
                <p class="py-5 text-2xl battambang-regular text-center uppercase text-black">
                    Edit Information Employee
                </p>
            </div>
            <div class="p-4 md:p-6 lg:p-10">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Employee ID -->
                    <div>
                        <label for="employee-id" class="pt-2 text-[16px]">Employee ID / <span class="battambang-regular text-[16px]">លេខសម្គាល់បុគ្គលិក</span></label>
                        <n-input v-model:value="form.employeeid" @input="form.employeeid= form.employeeid.trim()" type="text" class="mt-3 font-bold text-black" />
                    </div>

                    <!-- Employee Name -->
                    <div>
                        <label for="employeename" class="pt-2 text-[16px]">Employee Name / <span class="battambang-regular text-[16px]">ឈ្មោះបុគ្គលិក</span></label>
                        <n-input v-model:value="form.employeename" @input="form.employeename= form.employeename.trim()" type="text" class="mt-3 font-bold text-black" />
                    </div>

                    <!-- Gender -->
                    <div>
                        <label for="gender" class="pt-2 text-[16px]">Gender / <span class="battambang-regular text-[16px]">ភេទ</span></label>
                        <n-select v-model:value="form.gender" :options="genderOptions" class="mt-3" />
                    </div>

                    <!-- Phone -->
                    <div>
                        <label for="phone" class="pt-2 text-[16px]">Phone / <span class="battambang-regular text-[16px]">លេខទូរស័ព្ទ</span></label>
                        <n-input v-model:value="form.phone" @input="form.phone= form.phone.trim()" type="text" class="mt-3" />
                    </div>

                    <!-- Email -->
                    <div>
                        <label for="email" class="pt-2 text-[16px]">Email / <span class="battambang-regular text-[16px]">អ៊ីមែល</span></label>
                        <n-input v-model:value="form.email" @input="form.email= form.email.trim()" type="text" class="mt-3 font-bold text-black" />
                    </div>

                    <!-- Email Approver L1 -->
                    <div>
                        <label for="emailapproverl1" class="pt-2 text-[16px]">Email Approver L1 / <span class="battambang-regular text-[16px]">អ៊ីមែលអនុម័តលេខ១</span></label>
                        <n-input v-model:value="form.emailapproverl1" @input="form.emailapproverl1= form.emailapproverl1.trim()" type="text" class="mt-3 font-bold text-black" />
                    </div>

                    <!-- Email Approver L2 -->
                    <div>
                        <label for="emailapproverl2" class="pt-2 text-[16px]">Email Approver L2 / <span class="battambang-regular text-[16px]">អ៊ីមែលអនុម័តលេខ២</span></label>
                        <n-input v-model:value="form.emailapproverl2" @input="form.emailapproverl2= form.emailapproverl2.trim()" type="text" class="mt-3 font-bold text-black" />
                    </div>

                    <!-- Email Approver L3 -->
                    <div>
                        <label for="emailapproverl3" class="pt-2 text-[16px]">Email Approver L3 / <span class="battambang-regular text-[16px]">អ៊ីមែលអនុម័តលេខ៣</span></label>
                        <n-input v-model:value="form.emailapproverl3" @input="form.emailapproverl3= form.emailapproverl3.trim()" type="text" class="mt-3 font-bold text-black" />
                    </div>

                    <!-- Approver Email -->
                    <!-- <div>
                        <label for="approveremail" class="pt-2 text-[16px]">Approver Email / <span class="battambang-regular text-[16px]">អ៊ីមែលអ្នកអនុម័ត</span></label>
                        <n-input v-model:value="form.approveremail" type="text" class="mt-3 font-bold text-black" />
                    </div> -->

                    <!-- Acknowledge By -->
                    <div>
                        <label for="acknowledgeby" class="pt-2 text-[16px]">Acknowledge By / <span class="battambang-regular text-[16px]">អ្នកដែលទទួលស្គាល់</span></label>
                        <n-input v-model:value="form.acknowledgeby" @input="form.acknowledgeby= form.acknowledgeby.trim()" type="text" class="mt-3 font-bold text-black" />
                    </div>

                    <!-- Site -->
                    <div>
                        <label for="site" class="pt-2 text-[16px]">Site / <span class="battambang-regular text-[16px]">ទីតាំង</span></label>
                        <n-input v-model:value="form.site" @input="form.site= form.site.trim()" type="text" class="mt-3 font-bold text-black" />
                    </div>

                    <!-- Department -->
                    <div>
                        <label for="department" class="pt-2 text-[16px]">Department / <span class="battambang-regular text-[16px]">នាយកដ្ឋាន</span></label>
                        <n-input v-model:value="form.department" @input="form.department= form.department.trim()" class="mt-3" />
                    </div>

                    <!-- Section -->
                    <div>
                        <label for="section" class="pt-2 text-[16px]">Section / <span class="battambang-regular text-[16px]">ផ្នែក</span></label>
                        <n-input v-model:value="form.section" @input="form.section= form.section.trim()" class="mt-3" />
                    </div>

                    <!-- Status -->
                    <div>
                        <label for="status" class="pt-2 text-[16px]">Status / <span class="battambang-regular text-[16px]">ស្ថានភាព</span></label>
                        <n-select v-model:value="form.status" :options="statusOptions" class="mt-3" />
                    </div>

                    <!-- Allow Date -->
                    <div>
                        <label for="allowdate" class="pt-2 text-[16px]">Allow Date / <span class="battambang-regular text-[16px]">កាលបរិច្ឆេទ</span></label>
                        <n-input v-model:value="form.allowdate" @input="form.allowdate= form.allowdate.replace(/[^0-9]/g, '')" type="text" class="mt-3 font-bold text-black" />
                    </div>
                    <!-- AnnualLeave -->
                    <div>
                        <label for="allowdate" class="pt-2 text-[16px]">Balance Annual Leave / <span class="battambang-regular text-[16px]">ឈប់សម្រាកប្រចាំឆ្នាំ</span></label>
                        <n-input v-model:value="form.annualleave" @input="form.annualleave= form.annualleave.replace(/[^0-9]/g, '')" type="text" class="mt-3 font-bold text-black" />
                    </div>
                    <!-- AnnualLeave -->
                    <div>
                        <label for="allowdate" class="pt-2 text-[16px]">Remaining Annual Leave / <span class="battambang-regular text-[16px]">ឈប់សម្រាកប្រចាំឆ្នាំនៅសល់</span></label>
                        <n-input v-model:value="form.albalance" @input="form.albalance= form.albalance.replace(/[^0-9]/g, '')" type="text" class="mt-3 font-bold text-black" />
                    </div>
                    <!-- SickLeave -->
                    <div>
                        <label for="allowdate" class="pt-2 text-[16px]">Balance Sick Leave/ <span class="battambang-regular text-[16px]">ឈប់សម្រាកឈប់ដោយជំងឺ</span></label>
                        <n-input v-model:value="form.sickleave" @input="form.sickleave= form.sickleave.replace(/[^0-9]/g, '')" type="text" class="mt-3 font-bold text-black" />
                    </div>
                    <!-- SickLeave -->
                    <div>
                        <label for="allowdate" class="pt-2 text-[16px]">Remaining Sick Leave/ <span class="battambang-regular text-[16px]">ឈប់សម្រាកឈប់ដោយជំងឺនៅសល់</span></label>
                        <n-input v-model:value="form.slbalance" @input="form.slbalance= form.slbalance.replace(/[^0-9]/g, '')" type="text" class="mt-3 font-bold text-black" />
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-4 my-5">
                    <div class="pt-8 text-center">
                        <button type="submit" class="w-1/2 text-lg py-2 px-4 bg-gray-300 text-blue-600 hover:text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-[#a02022] dark:bg-[#a02022] dark:hover:bg-[#a02022]">
                            Submit Request
                        </button>
                    </div>
                </div>
            </div>

            <!-- Loading Spinner -->
            <div v-if="showModal" class="loading-overlay">
                <NSpin size="large" />
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from "axios";
import Swal from "sweetalert2";
import { useLoadingBar } from 'naive-ui';
import { useRouter, useRoute } from 'vue-router';
import { NSpin } from 'naive-ui';

const form = ref({
    RequestType: "update",
    ModifiedBy: "",
    employeeid: "",
    employeename: "",
    gender: "",
    phone: "",
    email: "",
    emailapproverl1: "",
    emailapproverl2: "",
    emailapproverl3: "",
    acknowledgeby: "",
    site: "",
    department: "",
    section: "",
    status: "",
    allowdate: "",
    annualleave:"",
    albalance:"",
    sickleave:"",
    slbalance:""

});

// Computed property to automatically generate approveremail
const approveremail = computed(() => {
    const emails = [form.value.emailapproverl1, form.value.emailapproverl2, form.value.emailapproverl3].filter(Boolean);
    return emails.join(';');
});

const route = useRoute();
const router = useRouter();
const employeeId = route.params.id;
const statusOptions = ref([
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
]);
const genderOptions = ref([
    { label: 'ប្រុស', value: 'Male' },
    { label: 'ស្រី', value: 'Female' },
]);

const showModal = ref(false);
const loadingBar = useLoadingBar();

onMounted(() => {
    const storedEmployeeName = localStorage.getItem('employeeData');
    if (storedEmployeeName) {
        form.value.ModifiedBy = JSON.parse(storedEmployeeName).employeename;
    }

    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    if (storedEmployees && Array.isArray(storedEmployees)) {
        const foundEmployee = storedEmployees.find(emp => emp.employeeid === employeeId);
        if (foundEmployee) {
            Object.keys(form.value).forEach(key => {
                if (foundEmployee[key] !== undefined) {
                    form.value[key] = foundEmployee[key];
                }
            });
        } else {
            console.error('Employee not found in localStorage');
        }
    } else {
        console.error('No employee data in localStorage');
    }
});

const submitForm = async () => {
    try {
        showModal.value = true;
        loadingBar.start();

        const payload = {
            ...form.value,
            approveremail: approveremail.value // Use computed approveremail
        };

        const response = await axios.post(
            'https://prod-20.southeastasia.logic.azure.com:443/workflows/2960c58dd6014352890958e1e7661bde/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9eUbtPI1huZ9N5Spswuq3wxC0_uOcZ9BaKT-xX61b_c',
            payload
        );

        if (response.data.status === "200") {
            Swal.fire("Success", "ការផ្លាស់ប្តូរបានជោគជ័យ!", "success").then(() => {
                router.push({ name: 'employee' });
            });
        } else {
            Swal.fire("Error", "ការផ្លាស់ប្តូររបស់អ្នកបរាជ័យ", "error");
        }
    } catch (error) {
        console.error("Error submitting request:", error);
        Swal.fire("Error", "មានបញ្ហាក្នុងការផ្លាស់ប្តូរ", "error");
    } finally {
        showModal.value = false;
        loadingBar.finish();
    }
};

</script>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
