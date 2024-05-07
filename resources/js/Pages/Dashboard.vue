<template>
    <Head title="Dashboard" />

    <div class="nk-content-body">
        <ContentHeader>
            <h3 class="nk-block-title page-title">Dashboard</h3>
            <div class="nk-block-des text-soft">
                <p>Overall statistics</p>
            </div>

            <template v-slot:tools>
                <a href="#" class="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em class="icon ni ni-more-v"></em></a>
                <div class="toggle-expand-content" data-content="pageMenu">
                    <ul class="nk-block-tools g-3">
                        <li>
                            <div class="dropdown">
                                <a href="#" class="dropdown-toggle btn btn-white btn-dim btn-outline-light" data-bs-toggle="dropdown"><em class="d-none d-sm-inline icon ni ni-calender-date"></em><span>Last 7 days</span><em class="dd-indc icon ni ni-chevron-right"></em></a>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <ul class="link-list-opt no-bdr">
                                        <li><a href="#" ><span>Last 7 days</span></a></li>
                                        <li><a href="#" ><span>Last 14 days</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="nk-block-tools-opt"><a href="#" id="reports-btn" class="btn btn-primary"><em class="icon ni ni-reports"></em><span>Reports</span></a></li>
                    </ul>
                </div>
            </template>
        </ContentHeader>
        <div class="nk-block">
            Content here
        </div><!-- .nk-block -->
    </div> 
</template>
