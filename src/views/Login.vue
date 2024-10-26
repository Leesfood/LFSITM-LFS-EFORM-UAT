<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        
        <span class="text-2xl font-semibold text-gray-700  underline">Login E-Form </span>
      </div>

      <form class="mt-4" @submit.prevent="submitForm">
        <label class="block">
          <span class="text-sm text-gray-700">លេខសម្គាល់បុគ្គលិក / <span>Employee ID</span></span>
          <input v-model="form.EmployeeID" type="text"  placeholder="បញ្ជូលលេខកូដសម្គាល់បុគ្គលិក"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
        </label>

        <div class="mt-6">
          <button type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-red-700 rounded-md focus:outline-none hover:bg-red-600">
            Sign in
          </button>
        </div>
      </form>
      <!-- <button @click="getAllDepartmentAndSections()">Test</button> -->
    </div>
  </div>
</template>

<script setup lang="ts" >
import { ref ,onMounted} from 'vue';
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from 'vue-router';
import { useLoadingBar } from 'naive-ui';
const form = ref({
  Title: "UserLogin",
  EmployeeID: ""
});
const router = useRouter();

const loadingBar = useLoadingBar();

const submitForm = async () => {
  loadingBar.start();
  try {
    const payload = {
      Title: form.value.Title,
      EmployeeID: form.value.EmployeeID
    };

    const response = await axios.post('https://prod-38.southeastasia.logic.azure.com:443/workflows/016c690387e341e2902bdceb2fa8c49c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=W04gOMNbYEulhX-FeybpSvwO4g5YdbFtUxPKuTO_hX4', payload);
    const employeeData = response.data;

    localStorage.setItem('employeeData', JSON.stringify(employeeData));
    localStorage.setItem('userRole', employeeData.role); // Store the role
    // Get the data from localStorage
    const storedData = localStorage.getItem('employeeData');

    // Check if storedData is null before parsing
    if (storedData !== null) {
      console.log("Stored employee data in localStorage:", JSON.parse(storedData));
    } else {
      console.log("No employee data found in localStorage");
    }
     if(employeeData.EmployeeID==null || employeeData.EmployeeID==""){
      Swal.fire(`មិនត្រឹមត្រូវ`, `លេខសម្គាល់ដែលបញ្ជូល: ${form.value.EmployeeID}`, "error");
     }else{
      Swal.fire("ជោគជ័យ", `សូមស្វាគមន៍, ${employeeData.EmployeeName}`, "success").then(() => {
      router.push('/dashboard');
    });
     }    
    form.value.EmployeeID = ""; // Reset the form
  } catch (error) {
    Swal.fire(`មិនត្រឹមត្រូវ`, `លេខសម្គាល់ដែលបញ្ជូល: ${form.value.EmployeeID}`, "error");
  } finally {
    loadingBar.finish();
  }
};

</script>

<style>
.battambang-regular {
  font-family: "Battambang", system-ui;
  font-weight: 400;
  font-style: normal;
}
</style>