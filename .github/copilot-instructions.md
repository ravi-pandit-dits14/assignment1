You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection


Assignment: Shopping Cart Application using NgRx
(Angular)
Objective
Create a Shopping Cart web application using Angular and NgRx to demonstrate state
management, scalable architecture, and best practices.
Tech Stack
1 Angular (v15 or above)
2 NgRx (Store, Actions, Reducers, Effects)
3 RxJS
4 Angular Router
5 SCSS / CSS
6 Mock API (JSON Server or static JSON)
Functional Requirements
1. Product Listing Page
1 Fetch products from a mock API using NgRx Effects
2 Display product name, price, image, and Add to Cart button
2. Shopping Cart Module
1 Add product to cart
2 Increase / Decrease quantity
3 Remove product from cart
4 Clear cart
5 Show total price and item count
3. State Management
App State Structure:
• Products State (Load, Success, Failure)
• Cart State (Add, Remove, Update Quantity, Clear)
NgRx Implementation Requirements
1 Actions using createAction
2 Reducers using createReducer
3 Selectors using createSelector
4 Effects for API calls
5 Strong typing (avoid any)
Bonus (Optional)
1 Persist cart in localStorage
2 Use NgRx Entity
3 Lazy-loaded Cart module
4 Loader and error handling
5 Cart count in header
Evaluation Criteria
1 NgRx architecture and flow
2 Code quality and folder structure
3 RxJS usage
4 Angular best practices
5 Error handling and optimization
