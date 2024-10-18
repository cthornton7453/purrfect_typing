import { DirectiveBinding } from 'vue';

export default {
    beforeMount(
        el: HTMLElement & { clickOutsideEvent?: EventListener },
        binding: DirectiveBinding,
    ) {
        el.clickOutsideEvent = ((event: Event) => {
            if (!(el === event.target || el.contains(event.target as Node))) {
                binding.value();
            }
        }) as EventListener;

        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el: HTMLElement & { clickOutsideEvent?: EventListener }) {
        if (el.clickOutsideEvent) {
            document.body.removeEventListener('click', el.clickOutsideEvent);
        }
    },
};
