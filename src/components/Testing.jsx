<Input
          label={label}
          value={value} //The current value of the input (controlled).
          onChange={onChange}
          isInvalid={!!error}
          color={error ? "danger" : "default"}
          errorMessage={error && error.message}
          variant="bordered"
          // placeholder={defaultValue}
          // onClear={() => {
          //   resetField(name);
          // }}
          // isRequired={isRequired} //If I use this, the message This field is required does not appear
          className="max-w-xs"
          // type={type === "password" ? (isVisible ? "text" : "password") : type}
          // isClearable={type === "password" ? false : true}
          isClearable
          onClear={() => {
            resetField(name);
          }}
          endContent={
            type === "password" && (
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            )
          }
        />