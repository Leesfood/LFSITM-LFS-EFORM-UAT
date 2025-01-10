<template>
  <div class=" min-h-screen h-full 2xl:min-h-screen xl:min-h-screen sm:min-h-screen">
      <div class="relative  mx-auto   grid grid-cols-1 gap-10  sm:grid-cols-2 lg:grid-cols-3">
        <router-link to="/gasolinecard">
          <div class="rounded-md hover:bg-red-600 border  border-[#ae2a2a] bg-[#af2121] p-8 text-center shadow">
            <div class="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border "
              style=" border-color: rgb(238, 238, 238);">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <path d="M8 4v2"></path>
                <path d="M16 4v2"></path>
                <path d="M3 10h18"></path>
                <path d="M12 14l4 4"></path>
                <path d="M16 14l-4 4"></path>
              </svg>

            </div>
            <h3 class="mt-6 text-white battambang-bold">ស្នើសុំ</h3>
            <p class="my-4 mb-0 font-normal leading-relaxed tracking-wide text-white">
              IT Support.
            </p>
          </div>
        </router-link>
        <router-link to="/sick-request">
          <div class="rounded-md hover:bg-red-600 border  border-[#ae2a2a] bg-[#af2121] p-8 text-center shadow">
            <div class="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border "
              style=" border-color: rgb(238, 238, 238);">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <path d="M8 4v2"></path>
                <path d="M16 4v2"></path>
                <path d="M3 10h18"></path>
                <path d="M12 14l4 4"></path>
                <path d="M16 14l-4 4"></path>
              </svg>

            </div>
            <h3 class="mt-6 text-white battambang-bold">ពាក្យសុំច្បាប់ឈប់សម្រាកឈប់ដោយជំងឺ</h3>
            <p class="my-4 mb-0 font-normal leading-relaxed tracking-wide text-white">
              Sick Leave Request Form.
            </p>
          </div>
        </router-link>

        <router-link to="/early">
          <div class="rounded-md hover:bg-red-600 border  border-[#ae2a2a] bg-[#af2121] p-8 text-center shadow">
            <div class="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border "
              style=" border-color: rgb(238, 238, 238);">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <path d="M8 4v2"></path>
                <path d="M16 4v2"></path>
                <path d="M3 10h18"></path>
                <path d="M12 14l4 4"></path>
                <path d="M16 14l-4 4"></path>
              </svg>

            </div>
            <h3 class="mt-6 text-white battambang-bold ">ពាក្យសុំអនុញ្ញាតិ​​ ចេញមុន</h3>
            <p class="my-4 mb-0 font-normal leading-relaxed tracking-wide text-white">
              Early leave Request Form.
            </p>
          </div>
        </router-link>
        
      </div>

  </div>
</template>
<style>
.battambang-thin {
  font-family: "Battambang", system-ui;
  font-weight: 100;
  font-style: normal;
}

.battambang-light {
  font-family: "Battambang", system-ui;
  font-weight: 300;
  font-style: normal;
}

.battambang-regular {
  font-family: "Battambang", system-ui;
  font-weight: 400;
  font-style: normal;
}

.battambang-bold {
  font-family: "Battambang", system-ui;
  font-weight: 700;
  font-style: normal;
}

.battambang-black {
  font-family: "Battambang", system-ui;
  font-weight: 900;
  font-style: normal;
}
</style>