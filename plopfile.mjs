import pluralize from "pluralize";

export default function Generators(
  /** @type{import('plop').NodePlopAPI} */
  plop,
) {
  plop.setGenerator("domain", {
    prompts: [
      {
        type: "input",
        name: "_name",
        message: "What is domain's name?",
      },
      {
        type: "list",
        name: "_type",
        message: "Which of these is the domain?",
        choices: ["Entity", "AggregateRoot"],
      },
      {
        type: "checkbox",
        name: "_target",
        message: "Which ones you want to generate?",
        choices: [
          "Controller",
          "ControllerException",
          "Repository",
          "RepositoryException",
          "IRepository",
          "Entity",
          "Identifier",
          "DomainException",
        ],
        default: (ans) => {
          if (ans._type === "Entity") {
            return ["Entity", "Identifier", "DomainException"];
          } else if (ans._type === "AggregateRoot") {
            return [
              "Controller",
              "ControllerException",
              "Repository",
              "RepositoryException",
              "IRepository",
              "Entity",
              "Identifier",
              "DomainException",
            ];
          }
        },
      },
      {
        type: "input",
        name: "_props",
        message:
          "What are properties of the domain? (ex: `id: number; name: string | undefined;`)",
      },
    ],
    actions: (ans) => {
      const data = {
        isEntity: ans._type === "Entity",
        isAggregateRoot: ans._type === "AggregateRoot",
        name: toLowerCaseFirst(ans._name),
        Name: toUpperCaseFirst(ans._name),
        type: ans._type,
        props: ans._props
          .split(";")
          .filter((x) => x != "")
          .map((x) => {
            const [name, type] = x.split(":").map((x) => x.trim());
            const typeWithoutUndefined = type
              .split("|")
              .map((x) => x.trim())
              .filter((x) => x !== "undefined")
              .join(" | ");
            const typeWithoutUndefinedAndNull = type
              .split("|")
              .map((x) => x.trim())
              .filter((x) => x !== "undefined" && x !== "null");
            const isArray =
              typeWithoutUndefinedAndNull.length === 1 &&
              typeWithoutUndefinedAndNull[0].endsWith("[]");
            return {
              name,
              Name: toUpperCaseFirst(name),
              type,
              typeWithoutUndefined,
              isNullable: type.includes("undefined") || type.includes("null"),
              isArray,
              arrayElementType: isArray
                ? typeWithoutUndefinedAndNull[0].slice(0, -2)
                : undefined,
            };
          }),
      };

      const actions = [];

      if (ans._target.includes("Controller")) {
        actions.push({
          type: "add",
          path: "src/modules/application/{{{Name}}}/Controller.ts",
          templateFile: "scaffolding/domain/Controller.ts.hbs",
          data,
        });
      }
      if (ans._target.includes("ControllerException")) {
        actions.push({
          type: "add",
          path: "src/modules/application/{{{Name}}}/Exception.ts",
          templateFile: "scaffolding/domain/ControllerException.ts.hbs",
          data,
        });
      }
      if (ans._target.includes("Repository")) {
        actions.push({
          type: "add",
          path: "src/modules/infra/prisma/{{{Name}}}/Repository.ts",
          templateFile: "scaffolding/domain/Repository.ts.hbs",
          data,
        });
      }
      if (ans._target.includes("RepositoryException")) {
        actions.push({
          type: "add",
          path: "src/modules/infra/common/{{{Name}}}/Exception.ts",
          templateFile: "scaffolding/domain/RepositoryException.ts.hbs",
          data,
        });
      }
      if (ans._target.includes("IRepository")) {
        actions.push({
          type: "add",
          path: "src/modules/domain/{{{Name}}}/IRepository.ts",
          templateFile: "scaffolding/domain/IRepository.ts.hbs",
          data,
        });
      }
      if (ans._target.includes("Entity")) {
        actions.push({
          type: "add",
          path: "src/modules/domain/{{{Name}}}/Entity.ts",
          templateFile: "scaffolding/domain/Entity.ts.hbs",
          data,
        });
      }
      if (ans._target.includes("Identifier")) {
        actions.push({
          type: "add",
          path: "src/modules/domain/{{{Name}}}/Identifier.ts",
          templateFile: "scaffolding/domain/Identifier.ts.hbs",
          data,
        });
      }
      if (ans._target.includes("DomainException")) {
        actions.push({
          type: "add",
          path: "src/modules/domain/{{{Name}}}/Exception.ts",
          templateFile: "scaffolding/domain/DomainException.ts.hbs",
          data,
        });
      }

      return actions;
    },
  });

  plop.setGenerator("use-case", {
    prompts: [
      {
        type: "input",
        name: "_domain",
        message: "What is domain's name?",
      },
      {
        type: "input",
        name: "_useCase",
        message: "What is use-case's name?",
      },
    ],
    actions: (ans) => {
      const data = {
        domain: toLowerCaseFirst(ans._domain),
        Domain: toUpperCaseFirst(ans._domain),
        useCase: toLowerCaseFirst(ans._useCase),
        UseCase: toUpperCaseFirst(ans._useCase),
      };
      return [
        {
          type: "append",
          pattern: /(?=\n\/\* __PLOP_DTO_APPEND__ \*\/)/,
          path: "src/modules/application/{{{Domain}}}/Controller.ts",
          templateFile: "scaffolding/use-case/DTO.ts.hbs",
          data,
        },
        {
          type: "append",
          pattern: /(?=\n  \/\* __PLOP_FUNCTION_APPEND__ \*\/)/,
          path: "src/modules/application/{{{Domain}}}/Controller.ts",
          templateFile: "scaffolding/use-case/function.ts.hbs",
          data,
        },
      ];
    },
  });

  plop.setHelper("pluralize", (value) => pluralize.plural(value));
  plop.setHelper("singularize", (value) => pluralize.singular(value));
}

function toLowerCaseFirst(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function toUpperCaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
