<template>
    <div> <!-- for some reason if you do not put an outer container div this component template will not render -->
       <div class="form-group " id="child_container">
			<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('child_first_name')}">
				<label class="label" for="child_first_name">Child's First Name <span class="req_star"> *</span></label>
				<input v-model="child_form_data.child_first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="child_first_name" type="text" placeholder="First Name" data-vv-delay="500" data-vv-as="child's first name">
				<span v-show="errors.has('child_first_name')" class="form-control-feedback">{{ errors.first('child_first_name') }}</span>
			</div>
			<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('child_last_name')}">
				<label class="label" for="child_last_name">Child's Last Name <span class="req_star"> *</span></label>
				<input v-model="child_form_data.child_last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="child_last_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="child's last name">
				<span v-show="errors.has('child_last_name')" class="form-control-feedback">{{ errors.first('child_last_name') }}</span>
			</div>
			<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('birthday')}"   style="padding-top: 20px;">
				<label class="label" for="birthday">Birthday <span class="req_star"> *</span></label>
				<input v-model="child_form_data.birthday" class="form-control" v-validate="'required|date_format:MM/DD/YYYY'" :class="{'input': true}" name="birthday" type="text" placeholder="mm/dd/yyyy" data-vv-delay="500" data-vv-as="birthday">
				<span v-show="errors.has('birthday')" class="form-control-feedback">{{ errors.first('birthday') }}</span>
			</div>
			<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('gender')}"  style="padding-top: 20px;">
				<label class="label" for="gender">Gender <span class="req_star"> *</span></label>
				<radio :name="'gender_'+randKey" value="male" v-model="child_form_data.gender" :key="randKey">Male</radio>
                <radio :name="'gender_'+ (randKey+1)" value="female" v-model="child_form_data.gender" :key="randKey+1">Female</radio>
                <span v-if="genderError" class="form-control-feedback">Please choosed a gender</span>
			</div>
		</div>
    </div>
</template>

<script>
    define(["Vue", 'vee-validate',  'vue-checkbox-radio', 'utility'], function(Vue,  VeeValidate, CheckboxRadio, Utility) {
        Vue.use(VeeValidate);
        Vue.use(CheckboxRadio.default);
        return Vue.component("multi-children-component", {
            template: template, // the variable template will be injected
            props:['id_num'],
            data: function() {
                return {
                    child_form_data: {},
                    genderError : false,
                }
            },
            computed: {
                randKey() {
                    return Utility.rannumber();
                }  
            },
            watch : {
                child_form_data () {
                    this.$emit('childUpdated', this.child_form_data);
                }
            }
        });
    });
</script>