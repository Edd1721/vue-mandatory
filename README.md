# vue-mandatory

Simple and easy Vue.js directive for form validation.

# Steps

1. Install it

```javascript
  npm install --save vue-mandatory
```

2. Import the library and use it as Vue plugin.

```javascript
  import vueMandatory from 'vue-mandatory'

  Vue.use(vueMandatory)
  
```
3. Use the directive **v-mandatory** in your HTML tag.

```javascript
  <template>...</template>
  <script>
  import vueMandatory from 'vue-mandatory'

   export default {
     ...,
     name: 'my-component',
     directives: {
      vueMandatory
     },
     data () {
       return {}
     }
   }
  </script>
```

4. Basic usage.
    * You can assing an object, with the customs fields, as value of the v-mandatory directive such as the email and password inputs in the following example.
    * You can assign custom values directly such as username input.
    * or only use without values such as gender select. In this way you will get the defaults values based on TailwindCSS for the styles.
```html
 <template>
   ...
   <div class="mb-4">
    <label
      class="block text-grey-darker text-sm font-bold mb-2"
      for="username"
    >
      Username
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      id="username"
      type="text"
      placeholder="jhonDoe"
      v-model="form.username"
      v-validate="{ msg: 'My custom message here', inputClasses: ['error'], warningClasses: ['background-red', 'text-bold'] }"
    />
  </div>
  <div class="mb-4">
    <label
      class="block text-grey-darker text-sm font-bold mb-2"
      for="email"
    >
      Email
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      id="email"
      type="email"
      placeholder="jhon.doe@mail.com"
      v-model="form.email"
      v-validate="{ msg: validate.email.msg, inputClasses: validate.inputClasses, warningClasses: validate.warningClasses, pattern: validate.email.pattern }"
    />
  </div>
   <div class="mb-6">
    <label
      class="block text-grey-darker text-sm font-bold mb-2"
      for="password"
    >
      Password
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      id="password"
      type="password"
      placeholder="******************"
      v-model="form.password"
      v-validate="{ msg: validate.password.msg, inputClasses: validate.inputClasses, warningClasses: validate.warningClasses }"
    />
  </div>
  <div class="mb-6">
    <label
      class="block text-grey-darker text-sm font-bold mb-2"
      for="password"
    >
      Gender
    </label>
    <select
      class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      id="gender"
      v-model="form.gender"
      v-validate
    >
      <option value="">Choose one</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
    </div>
   ...
 </template>
 <script>
   import vueMandatory from 'vue-mandatory'

   export default {
     ...,
     directives: {
       vueMandatory
     },
     data () {
       return  {
         validate: {
           email: {
             msg: 'The Email Field is required',
             pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
           }
           password: {
             msg: 'Password is mandatory'
           },
           gender: {
             msg: 'Choose one gender'
           },
           inputClasses: ['border-red'],
           warningClasses: ['mt-3', 'text-red', 'text-xs', 'italic']
         }
       }
     },
     ...
   }
 </script>
```

## License

MIT © Edward S. Ramos
