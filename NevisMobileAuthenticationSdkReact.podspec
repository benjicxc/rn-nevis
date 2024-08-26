require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
	s.name         = "NevisMobileAuthenticationSdkReact"
	s.version      = package["version"]
	s.summary      = package["description"]
	s.homepage     = package["homepage"]
	s.license      = package["license"]
	s.authors      = package["author"]

	s.platforms    = { :ios => "12.4" }
	s.source       = { :git => "https://github.com/nevissecurity/nevis-mobile-authentication-sdk-react.git" }
	s.source_files = "ios/**/*.{h,m,mm,swift}"

	s.dependency "React-Core"
	s.dependency "NevisMobileAuthentication", '~> 3.5.0'
	s.dependency "NevisMobileAuthentication-Debug", '~> 3.5.0'

	printf( "New architecture for the React Native Module is: %s\n", ENV['RCT_NEW_ARCH_ENABLED'] == '1' ? "enabled" : "disabled")
	# install_modules_dependencies(s)
end
