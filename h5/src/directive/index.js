export default function useDirectiveEffect(app) {
  app.directive("theme", {
    beforeMount(el, binding, vnode) {
      // console.info("123", binding);
      if (binding.value == true || binding.value == undefined) {
        const currentColor = document.body.getAttribute("data-theme");
        el.style.color = currentColor;
      }
    },
    updated(el, binding, vnode) {
      // console.info("123", binding);
      if (binding.value == true || binding.value == undefined) {
        const currentColor = document.body.getAttribute("data-theme");
        el.style.color = currentColor;
      } else {
        el.style.color = "";
      }
    }
  });
  app.directive("theme-bg", {
    beforeMount(el, binding, vnode) {
      if (binding.value == true || binding.value == undefined) {
        const currentColor = document.body.getAttribute("data-theme");
        el.style.background = currentColor;
      }
    },
    updated(el, binding, vnode) {
      // console.info("123", binding);
      if (binding.value == true || binding.value == undefined) {
        const currentColor = document.body.getAttribute("data-theme");
        el.style.background = currentColor;
      } else {
        el.style.background = "";
      }
    }
  });
  app.directive("theme-border", {
    beforeMount(el, binding, vnode) {
      // console.log(333, binding);
      const extra = binding.value || [];
      const currentColor = document.body.getAttribute("data-theme");
      extra.push(currentColor);
      el.style.border = extra.join(" ");
    }
  });

  app.directive("theme-boxshadow", {
    beforeMount(el, binding, vnode) {
      // console.log(333, binding);
      const extra = binding.value || [];
      const currentColor = document.body.getAttribute("data-theme");
      extra.push(currentColor);
      el.style.boxShadow = extra.join(" ");
    }
  });
}
